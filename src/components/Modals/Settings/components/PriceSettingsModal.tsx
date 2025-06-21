import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import { PriceTier } from "@/types/settingTypes";
import SettingFiles from "@/assets/icons/settings";
import Image from "next/image";

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
  const [newTier, setNewTier] = useState<Partial<PriceTier>>({
    name: "",
    description: "",
    markupPercent: 0,
    discountPercent: 0,
  });

  const addTier = () => {
    if (newTier.name) {
      const tier: PriceTier = {
        id: Date.now().toString(),
        name: newTier.name,
        description: newTier.description || "",
        markupPercent: newTier.markupPercent || 0,
        discountPercent: newTier.discountPercent || 0,
      };
      setTiers((prev) => [...prev, tier]);
      setNewTier({
        name: "",
        description: "",
        markupPercent: 0,
        discountPercent: 0,
      });
    }
  };

  const deleteTier = (id: string) => {
    setTiers((prev) => prev.filter((tier) => tier.id !== id));
  };

  const handleSave = () => {
    onSave(tiers);
    onClose();
  };

  return (
    <Modal
    subtitle="Update and Manage Price Tiers"
      image={SettingFiles.PriceTier}
      isOpen={isOpen}
      onClose={onClose}
      title="Price Settings"
    >
      <div className="space-y-6">
        {tiers.map((tier) => (
          <div key={tier.id} className="border border-[#E6E6E6] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{tier.name}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-[#15BA5C] flex items-center rounded-[20px] px-2.5 py-1.5"
                >
                  <Image
                    src={SettingFiles.EditIcon}
                    alt="Settings"
                    className="h-[14px] w-[14px] mr-1"
                  />
                  <span className=" text-white">Edit</span>
                </button>

                <button
                  onClick={() => deleteTier(tier.id)}
                  type="button"
                  className="border border-[#E33629] flex items-center rounded-[20px] px-2.5 py-1.5"
                >
                  <Image
                    src={SettingFiles.TrashIcon}
                    alt="Settings"
                    className="h-[14px] w-[14px] mr-1"
                  />
                  <span className=" text-[#E33629]">Delete</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm text-gray-600">
              <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                Markup: {tier.markupPercent}%
              </div>
              <div className="border border-[#E6E6E6] px-3.5 py-2.5 rounded-[12px]">
                Discount: {tier.discountPercent}%
              </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h4 className="font-medium mb-4">Add New Price Tier</h4>
          <div className="space-y-4">
            <Input
              label="Price Tier Name"
              value={newTier.name || ""}
              onChange={(e) =>
                setNewTier((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter the name of the Price Tier"
            />

            <Input
              label="Description (optional)"
              value={newTier.description || ""}
              onChange={(e) =>
                setNewTier((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Enter description of the Price Tier"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Markup %
                </label>
                <div className="flex items-center gap-2">
                  <Switch checked={false} onChange={() => {}} />
                  <input
                    type="number"
                    value={newTier.markupPercent || 0}
                    onChange={(e) =>
                      setNewTier((prev) => ({
                        ...prev,
                        markupPercent: Number(e.target.value),
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount %
                </label>
                <div className="flex items-center gap-2">
                  <Switch checked={false} onChange={() => {}} />
                  <input
                    type="number"
                    value={newTier.discountPercent || 0}
                    onChange={(e) =>
                      setNewTier((prev) => ({
                        ...prev,
                        discountPercent: Number(e.target.value),
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <Button variant="secondary" onClick={addTier} className="w-full">
              + Add a new Price Tier
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-full">
            Save all Price Tiers
          </Button>
        </div>
      </div>
    </Modal>
  );
};
