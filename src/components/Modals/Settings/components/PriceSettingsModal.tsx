import React, { useState, useRef } from "react";
import { Modal } from "../ui/Modal";
import SettingFiles from "@/assets/icons/settings";
import Image from "next/image";
import { Input } from "../ui/Input";
import settingsService from "@/services/settingsService";
import { useBusinessStore } from "@/stores/useBusinessStore";
import { ApiResponseType } from "@/types/httpTypes";
import { toast } from "sonner";

interface PriceTier {
  id: number;
  name: string;
  description: string;
  pricingRules: {
    markupPercentage?: number;
    discountPercentage?: number;
    fixedMarkup?: number;
    fixedDiscount?: number;
  };
  isActive: boolean;
  isEditing?: boolean;
  isNew?: boolean; // Flag to track newly added tiers
}

interface PriceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceSettingsModal: React.FC<PriceSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { selectedOutletId, outlets } = useBusinessStore();
  const [tiers, setTiers] = useState<PriceTier[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const priceTierFormRef = useRef<{
    addPendingTier: () => boolean;
    getPendingTier: () => PriceTier | null;
    resetForm: () => void;
  }>(null);

  // Initialize tiers only when modal opens and selectedOutletId exists
  React.useEffect(() => {
    if (isOpen && selectedOutletId) {
      const outlet = outlets.find((val) => val.outlet.id === selectedOutletId);
      if (outlet && Array.isArray(outlet.outlet.priceTier)) {
        console.log(outlet.outlet.priceTier, "Loaded tiers");
        setTiers(
          outlet.outlet.priceTier.map((tier) => ({ ...tier, isEditing: false }))
        );
      } else {
        setTiers([]);
      }
    }
  }, [isOpen, selectedOutletId, outlets]);

  if (!selectedOutletId) return null;

  const addTier = (tier: Omit<PriceTier, "id" | "isActive">) => {
    const newTier: PriceTier = {
      ...tier,
      id: Date.now(), // Temporary ID for new tiers
      isActive: true,
      isNew: true, // Mark as new
    };
    setTiers((prev) => [...prev, newTier]);
  };

  const deleteTier = async (id: number) => {
    const tierToDelete = tiers.find((t) => t.id === id);

    // If it's a new tier (not saved to backend), just remove from state
    if (tierToDelete?.isNew) {
      setTiers((prev) => prev.filter((t) => t.id !== id));
      return;
    }

    // Otherwise, delete from backend
    const result = (await settingsService.deletePriceTier({
      outletId: selectedOutletId,
      priceTierId: id,
    })) as ApiResponseType;

    if (result.status) {
      setTiers((prev) => prev.filter((t) => t.id !== id));
      toast.success("Price tier deleted successfully");
    } else {
      toast.error("Failed to delete price tier");
    }
  };

  const toggleEdit = (id: number) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === id ? { ...tier, isEditing: !tier.isEditing } : tier
      )
    );
  };

  const updateTier = (id: number, updatedTier: Partial<PriceTier>) => {
    setTiers((prev) =>
      prev.map((tier) => (tier.id === id ? { ...tier, ...updatedTier } : tier))
    );

    // If it's not a new tier, save to backend immediately
    const tier = tiers.find((t) => t.id === id);
    if (tier && !tier.isNew) {
      saveTierToBackend({ ...tier, ...updatedTier });
    }
  };

  const saveTierToBackend = async (tier: PriceTier) => {
    try {
      if (tier.isNew) {
        // Create new tier
        const result = (await settingsService.addPriceTier({
          outletId: selectedOutletId,
          name: tier.name,
          description: tier.description,
          pricingRules: tier.pricingRules,
          isActive: tier.isActive,
        })) as ApiResponseType;

        if (result.status) {
          // Update the tier in state to mark it as saved
          setTiers((prev) =>
            prev.map((t) => (t.id === tier.id ? { ...t, isNew: false } : t))
          );
        }
      }
    } catch (error) {
      console.error("Failed to save tier", error);
      toast.error("Failed to save price tier");
    }
  };

  const handleSaveAll = async () => {
    // Get any pending tier from the form
    const pendingTier = priceTierFormRef.current?.getPendingTier();

    // Get all new tiers from the current state
    const newTiers = tiers.filter((tier) => tier.isNew);

    // Combine existing new tiers with the pending tier (if any)
    const allTiersToSave = [...newTiers];
    if (pendingTier) {
      allTiersToSave.push(pendingTier);
    }

    console.log(tiers, "tiers");
    console.log(allTiersToSave, "allTiersToSave");

    if (allTiersToSave.length === 0) {
      toast.info("No new price tiers to save.");
      return;
    }

    setIsSaving(true);
    try {
      const results = await Promise.allSettled(
        allTiersToSave.map((tier) =>
          settingsService.addPriceTier({
            outletId: selectedOutletId,
            name: tier.name,
            description: tier.description,
            pricingRules: tier.pricingRules,
            isActive: tier.isActive,
          })
        )
      );

      const failed = results.filter((res) => res.status === "rejected");
      if (failed.length > 0) {
        toast.error(`${failed.length} tier(s) failed to save.`);
      } else {
        toast.success("All price tiers saved successfully.");
        // Mark all tiers as saved and add the pending tier to the list
        setTiers((prev) => {
          const updatedTiers = prev.map((tier) => ({ ...tier, isNew: false }));
          // Add the pending tier if it exists
          if (pendingTier) {
            updatedTiers.push({ ...pendingTier, isNew: false });
          }
          return updatedTiers;
        });

        // Clear the form after successful save
        priceTierFormRef.current?.resetForm();
      }
    } catch (error) {
      console.error("Failed to save tiers", error);
      toast.error("An unexpected error occurred while saving price tiers.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to get display values for markup/discount
  const getDisplayValue = (tier: PriceTier) => {
    const markup = tier.pricingRules.markupPercentage || 0;
    const discount = tier.pricingRules.discountPercentage || 0;
    return { markup, discount };
  };

  return (
    <Modal
      size="md"
      subtitle="Update and Manage Price Tiers"
      image={SettingFiles.PriceTier}
      isOpen={isOpen}
      onClose={onClose}
      title="Price Settings"
    >
      <div className="space-y-6">
        {tiers.length > 0 &&
          tiers.map((tier) => {
            const { markup, discount } = getDisplayValue(tier);

            return (
              <div
                key={tier.id}
                className="rounded-lg p-4 border border-gray-200"
              >
                {tier.isEditing ? (
                  <EditableTierForm
                    tier={tier}
                    onSave={(updatedTier) => {
                      updateTier(tier.id, { ...updatedTier, isEditing: false });
                    }}
                    onCancel={() => toggleEdit(tier.id)}
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{tier.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEdit(tier.id)}
                          type="button"
                          className="bg-[#15BA5C] flex items-center rounded-[20px] px-2.5 py-1.5 hover:bg-[#13a552] transition-colors"
                        >
                          <Image
                            src={SettingFiles.EditIcon}
                            alt="Edit"
                            className="h-[14px] w-[14px] mr-1"
                          />
                          <span className="text-white">Edit</span>
                        </button>
                        <button
                          onClick={() => deleteTier(tier.id)}
                          type="button"
                          className="border border-[#E33629] flex items-center rounded-[20px] px-2.5 py-1.5 hover:bg-red-50 transition-colors"
                        >
                          <Image
                            src={SettingFiles.TrashIcon}
                            alt="Delete"
                            className="h-[14px] w-[14px] mr-1"
                          />
                          <span className="text-[#E33629]">Delete</span>
                        </button>
                      </div>
                    </div>

                    {tier.description && (
                      <div className="text-sm text-gray-600 mb-2">
                        {tier.description}
                      </div>
                    )}

                    <div className="text-sm text-gray-600 space-y-2">
                      {markup > 0 && (
                        <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                          Markup: {markup}%
                        </div>
                      )}
                      {discount > 0 && (
                        <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                          Discount: {discount}%
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}

        <div>
          <h4 className="font-medium mb-4">Add New Price Tier</h4>
          <PriceTierForm ref={priceTierFormRef} onAdd={addTier} />
        </div>

        {/* Only show save button if there are new tiers */}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`w-full text-white py-3 rounded-[10px] font-medium text-base transition-colors ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#15BA5C] hover:bg-[#13a552]"
            }`}
            type="button"
          >
            {isSaving ? "Saving..." : "Save Price Tiers"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Editable form component for existing tiers
interface EditableTierFormProps {
  tier: PriceTier;
  onSave: (tier: Partial<PriceTier>) => void;
  onCancel: () => void;
}

const EditableTierForm: React.FC<EditableTierFormProps> = ({
  tier,
  onSave,
  onCancel,
}) => {
  const [editedTier, setEditedTier] = useState({
    name: tier.name,
    description: tier.description || "",
    markupPercent: tier.pricingRules.markupPercentage || 0,
    discountPercent: tier.pricingRules.discountPercentage || 0,
  });

  const [markupEnabled, setMarkupEnabled] = useState(
    (tier.pricingRules.markupPercentage || 0) > 0
  );
  const [discountEnabled, setDiscountEnabled] = useState(
    (tier.pricingRules.discountPercentage || 0) > 0
  );

  const handleMarkupToggle = (enabled: boolean) => {
    setMarkupEnabled(enabled);
    if (enabled) {
      setDiscountEnabled(false);
      setEditedTier((prev) => ({ ...prev, discountPercent: 0 }));
    } else {
      setEditedTier((prev) => ({ ...prev, markupPercent: 0 }));
    }
  };

  const handleDiscountToggle = (enabled: boolean) => {
    setDiscountEnabled(enabled);
    if (enabled) {
      setMarkupEnabled(false);
      setEditedTier((prev) => ({ ...prev, markupPercent: 0 }));
    } else {
      setEditedTier((prev) => ({ ...prev, discountPercent: 0 }));
    }
  };

  const handleSave = () => {
    if (!editedTier.name || editedTier.name.trim() === "") {
      toast.warning("Please enter a price tier name.");
      return;
    }

    onSave({
      name: editedTier.name.trim(),
      description: editedTier.description.trim(),
      pricingRules: {
        markupPercentage: markupEnabled ? editedTier.markupPercent : undefined,
        discountPercentage: discountEnabled
          ? editedTier.discountPercent
          : undefined,
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Price Tier Name
        </label>
        <input type="text"
          className="w-full px-4 py-3 bg-white border border-[#D1D1D1] outline-none rounded-lg"
          value={editedTier.name}
          onChange={(e) =>
            setEditedTier({ ...editedTier, name: e.target.value })
          }
          placeholder="Enter the name of the Price Tier"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          className="w-full px-4 py-3 bg-white border border-gray-300 outline-none rounded-lg resize-none text-sm"
          value={editedTier.description}
          onChange={(e) =>
            setEditedTier({ ...editedTier, description: e.target.value })
          }
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="markup-checkbox"
            checked={markupEnabled}
            onChange={(e) => handleMarkupToggle(e.target.checked)}
            className="w-4 h-4 text-[#15BA5C] border-gray-300 rounded focus:ring-[#15BA5C]"
          />
          <label htmlFor="markup-checkbox" className="text-sm font-medium">
            Markup %
          </label>
        </div>

        {markupEnabled && (
          <Input
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
            type="number"
            min={0}
            max={100}
            value={editedTier.markupPercent || ""}
            onChange={(e) =>
              setEditedTier({
                ...editedTier,
                markupPercent: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="Enter markup percentage"
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="discount-checkbox"
            checked={discountEnabled}
            onChange={(e) => handleDiscountToggle(e.target.checked)}
            className="w-4 h-4 text-[#15BA5C] border-gray-300 rounded focus:ring-[#15BA5C]"
          />
          <label htmlFor="discount-checkbox" className="text-sm font-medium">
            Discount %
          </label>
        </div>

        {discountEnabled && (
          <Input
            type="number"
            min={0}
            max={100}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg"
            value={editedTier.discountPercent || ""}
            onChange={(e) =>
              setEditedTier({
                ...editedTier,
                discountPercent: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="Enter discount percentage"
          />
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-[#15BA5C] text-white py-2.5 rounded-[10px] font-medium text-base hover:bg-[#13a552] transition-colors"
          type="button"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-[10px] font-medium text-base hover:bg-gray-50 transition-colors"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Form component for adding new tiers
interface PriceTierFormProps {
  onAdd: (tier: Omit<PriceTier, "id" | "isActive">) => void;
}

export const PriceTierForm = React.forwardRef<
  {
    addPendingTier: () => boolean;
    getPendingTier: () => PriceTier | null;
    resetForm: () => void;
  },
  PriceTierFormProps
>(({ onAdd }, ref) => {
  const [tier, setTier] = useState({
    name: "",
    description: "",
    markupPercent: 0,
    discountPercent: 0,
  });

  const [markupEnabled, setMarkupEnabled] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);

  const handleMarkupToggle = (enabled: boolean) => {
    setMarkupEnabled(enabled);
    if (enabled) {
      setDiscountEnabled(false);
      setTier((prev) => ({ ...prev, discountPercent: 0 }));
    }
  };

  const handleDiscountToggle = (enabled: boolean) => {
    setDiscountEnabled(enabled);
    if (enabled) {
      setMarkupEnabled(false);
      setTier((prev) => ({ ...prev, markupPercent: 0 }));
    }
  };

  const resetForm = () => {
    setTier({
      name: "",
      description: "",
      markupPercent: 0,
      discountPercent: 0,
    });
    setMarkupEnabled(false);
    setDiscountEnabled(false);
  };

  const createTierObject = () => {
    return {
      id: Date.now(),
      name: tier.name.trim(),
      description: tier.description.trim(),
      pricingRules: {
        markupPercentage: markupEnabled ? tier.markupPercent : undefined,
        discountPercentage: discountEnabled ? tier.discountPercent : undefined,
      },
      isActive: true,
      isNew: true,
    };
  };

  const addTierInternal = () => {
    if (!tier.name || tier.name.trim() === "") {
      return false;
    }

    const newTier = {
      name: tier.name.trim(),
      description: tier.description.trim(),
      pricingRules: {
        markupPercentage: markupEnabled ? tier.markupPercent : undefined,
        discountPercentage: discountEnabled ? tier.discountPercent : undefined,
      },
    };

    onAdd(newTier);
    resetForm();
    return true;
  };

  // Expose methods to parent component
  React.useImperativeHandle(ref, () => ({
    addPendingTier: () => {
      // Only add if there's actually data in the form
      if (tier.name.trim() !== "") {
        return addTierInternal();
      }
      return false;
    },
    getPendingTier: () => {
      // Return the pending tier if there's data, otherwise null
      if (tier.name.trim() !== "") {
        return createTierObject();
      }
      return null;
    },
    resetForm: resetForm,
  }));

  const handleAdd = () => {
    if (!tier.name || tier.name.trim() === "") {
      alert("Please enter a price tier name.");
      return;
    }
    addTierInternal();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Price Tier Name
        </label>
        <input
        type="text"
          className="w-full px-4 py-3 bg-white border outline-none border-[#D1D1D1] rounded-lg"
          value={tier.name}
          onChange={(e) => setTier({ ...tier, name: e.target.value })}
          placeholder="Enter the name of the Price Tier"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          className="w-full px-4 py-3 bg-white border border-[#D1D1D1] outline-none rounded-lg resize-none text-sm"
          value={tier.description}
          onChange={(e) => setTier({ ...tier, description: e.target.value })}
          placeholder="Enter description"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="new-markup-checkbox"
            checked={markupEnabled}
            onChange={(e) => handleMarkupToggle(e.target.checked)}
            className="w-4 h-4 text-[#15BA5C] border-[#D1D1D1] rounded focus:ring-[#15BA5C]"
          />
          <label htmlFor="new-markup-checkbox" className="text-sm font-medium">
            Markup %
          </label>
        </div>

        {markupEnabled && (
          <Input
            className="w-full px-4 py-3 bg-white border border-[#D1D1D1] outline-none rounded-lg"
            type="number"
            min={0}
            max={100}
            value={tier.markupPercent || ""}
            onChange={(e) =>
              setTier({
                ...tier,
                markupPercent: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="Enter markup percentage"
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="new-discount-checkbox"
            checked={discountEnabled}
            onChange={(e) => handleDiscountToggle(e.target.checked)}
            className="w-4 h-4 text-[#15BA5C] border-[#D1D1D1] rounded focus:ring-[#15BA5C]"
          />
          <label
            htmlFor="new-discount-checkbox"
            className="text-sm font-medium"
          >
            Discount %
          </label>
        </div>

        {discountEnabled && (
          <Input
            type="number"
            min={0}
            max={100}
            className="w-full px-4 py-3 bg-white border border-[#D1D1D1] rounded-lg"
            value={tier.discountPercent || ""}
            onChange={(e) =>
              setTier({
                ...tier,
                discountPercent: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="Enter discount percentage"
          />
        )}
      </div>

      <button
        onClick={handleAdd}
        className="border border-[#15BA5C] w-full text-[#15BA5C] py-2.5 rounded-[10px] font-medium text-base mt-4 hover:bg-green-50 transition-colors"
        type="button"
      >
        + Add a new Price Tier
      </button>
    </div>
  );
});

PriceTierForm.displayName = "PriceTierForm";
