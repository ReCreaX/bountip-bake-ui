// LabellingSettingsModal.tsx
import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import SettingFiles from "@/assets/icons/settings";

interface LabellingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabellingSettingsModal: React.FC<LabellingSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    businessName: "Bakery Name",
    fontSize: "Small Text Size",
    paperSize: "Tape Size",
    showBarcode: true,
    header: "Establishment Business Text",
    customBusinessText: "Customized Business Text",
    showBusinessLine: true,
    labelItems: [
      { name: "Label Name", enabled: true },
      { name: "Label Type", enabled: true },
      { name: "Product Name", enabled: true },
      { name: "Best Before", enabled: true },
      { name: "Product Weight", enabled: true },
      { name: "Best Number", enabled: true },
      { name: "ManufacturedDate", enabled: true },
      { name: "Barcode", enabled: true },
      { name: "Business Summary", enabled: true },
      { name: "Allergen", enabled: true },
      { name: "Price", enabled: true },
    ],
    customMessage: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const toggleLabelItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      labelItems: prev.labelItems.map((item, i) => 
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    }));
  };

  return (
    <Modal
      image={SettingFiles.LabelingSettings}
      isOpen={isOpen}
      onClose={onClose}
      title="Labelling"
      subtitle="Customize your product labels"
    >
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">Live Preview</h3>
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-sm font-bold mb-2">{formData.businessName}</div>
            <div className="text-xs text-gray-600 mb-2">John Doe</div>
            <div className="text-xs text-gray-600 mb-2">ABC RESTAURANT</div>
            <div className="text-xs text-gray-600 mb-2">235-56-78-90-05-06</div>
            <div className="text-xs">||||||||||||||||||||||||</div>
            <div className="text-xs mt-2 text-green-600">
              Thank you for shopping with us!
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Label Branding</h4>
            <div className="space-y-4">
              <Input
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>{formData.fontSize}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>{formData.paperSize}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Header</h4>
            <div className="space-y-4">
              <Input
                label="Show different Business Text"
                value={formData.header}
                onChange={(e) => setFormData(prev => ({ ...prev, header: e.target.value }))}
              />
              <Input
                label="Customized Business Text"
                value={formData.customBusinessText}
                onChange={(e) => setFormData(prev => ({ ...prev, customBusinessText: e.target.value }))}
              />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Show business line list</label>
                <Switch
                  checked={formData.showBusinessLine}
                  onChange={(checked) => setFormData(prev => ({ ...prev, showBusinessLine: checked }))}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Label Information</h4>
            <div className="space-y-3">
              {formData.labelItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <Switch
                    checked={item.enabled}
                    onChange={() => toggleLabelItem(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom &quot;Thank you&quot; Message
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
              rows={3}
              value={formData.customMessage}
              onChange={(e) => setFormData(prev => ({ ...prev, customMessage: e.target.value }))}
              placeholder="Enter your custom message"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </form>
      </div>
    </Modal>
  );
};









