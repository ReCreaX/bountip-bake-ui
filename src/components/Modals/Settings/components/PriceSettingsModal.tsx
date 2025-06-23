import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import SettingFiles from "@/assets/icons/settings";
import Image from "next/image";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";

interface PriceTier {
  id: string;
  name: string;
  description?: string;
  markupPercent: number;
  discountPercent: number;
}

interface PriceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceTiers: PriceTier[];
  onSave: (tiers: PriceTier[]) => void;
}

export const PriceSettingsModal: React.FC<PriceSettingsModalProps> = ({
  isOpen,
  onClose,
  priceTiers,
  onSave,
}) => {
  const [tiers, setTiers] = useState<PriceTier[]>(priceTiers);

  const addTier = (tier: PriceTier) => {
    setTiers((prev) => [...prev, tier]);
  };

  const deleteTier = (id: string) => {
    setTiers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = () => {
    onSave(tiers);
    onClose();
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
        {tiers.map((tier) => (
          <div key={tier.id} className="rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{tier.name}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-[#15BA5C] flex items-center rounded-[20px] px-2.5 py-1.5"
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
                  className="border border-[#E33629] flex items-center rounded-[20px] px-2.5 py-1.5"
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
            <div className="text-sm text-gray-600 space-y-2">
              <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                Markup: {tier.markupPercent}%
              </div>
              <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                Discount: {tier.discountPercent}%
              </div>
            </div>
          </div>
        ))}

        <div className="">
          <h4 className="font-medium mb-4">Add New Price Tier</h4>
          <PriceTierForm onAdd={addTier} />
        </div>

        <div className="flex justify-end">
        <button onClick={handleSave} className="bg-[#15BA5C] w-full text-white py-3 rounded-[10px] font-medium text-base " type="button">
        Save all Price Tiers
</button>
          
        </div>
      </div>
    </Modal>
  );
};

interface PriceTierFormProps {
  onAdd: (tier: PriceTier) => void;
}

export const PriceTierForm: React.FC<PriceTierFormProps> = ({ onAdd }) => {
  const [tier, setTier] = useState<Partial<PriceTier>>({
    name: "",
    description: "",
    markupPercent: 0,
    discountPercent: 0,
  });

  const [markupEnabled, setMarkupEnabled] = useState(false);
  const [discountEnabled, setDiscountEnabled] = useState(false);

  const handleAdd = () => {
    if (!tier.name || tier.name.trim() === "") {
      alert("Please enter a price tier name.");
      return;
    }

    const newTier: PriceTier = {
      id: Date.now().toString(),
      name: tier.name,
      description: tier.description || "",
      markupPercent: markupEnabled ? tier.markupPercent || 0 : 0,
      discountPercent: discountEnabled ? tier.discountPercent || 0 : 0,
    };

    onAdd(newTier);

    setTier({
      name: "",
      description: "",
      markupPercent: 0,
      discountPercent: 0,
    });
    setMarkupEnabled(false);
    setDiscountEnabled(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Price Tier Name</label>
        <Input
          className="w-full px-4 py-3 text-left outline-none bg-white border border-gray-300 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors"
          value={tier.name || ""}
          onChange={(e) => setTier({ ...tier, name: e.target.value })}
          placeholder="Enter the name of the Price Tier"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors resize-none text-sm"
          value={tier.description || ""}
          onChange={(e) => setTier({ ...tier, description: e.target.value })}
          placeholder="Enter description"
          rows={4}
        />
      </div>

      <div className="flex flex-col  gap-3.5">
        <div className="flex items-center gap-[36px]">
          <label className="block text-sm font-medium mb-1">Markup % </label>
          <Switch checked={markupEnabled} onChange={setMarkupEnabled} />
        </div>

        {markupEnabled && (
          <Input
            className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors"
            type="text"
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

      <div>
        <div className="flex items-center gap-[36px]">
          <label className="block text-sm font-medium mb-1">Discount %</label>
          <Switch checked={discountEnabled} onChange={setDiscountEnabled} />
        </div>
        {discountEnabled && (
          <Input
            type="text"
            className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15BA5C] transition-colors"
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

      <button onClick={handleAdd} className="border border-[#15BA5C] w-full text-[#15BA5C] py-2 rounded-[10px] font-medium text-base mt-5" type="button">
        + Add a new Price Tier
      </button>
      
    </div>
  );
};
