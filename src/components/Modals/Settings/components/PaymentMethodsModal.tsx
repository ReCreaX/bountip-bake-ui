import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Switch } from "../ui/Switch";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { PaymentMethod } from "@/types/settingTypes";
import SettingFiles from "@/assets/icons/settings";

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  onSave: (methods: PaymentMethod[]) => void;
}

export const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({
  isOpen,
  onClose,
  paymentMethods,
  onSave,
}) => {
  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods);

  const handleToggle = (id: string, enabled: boolean) => {
    setMethods((prev) =>
      prev.map((method) => (method.id === id ? { ...method, enabled } : method))
    );
  };

  const handleSave = () => {
    onSave(methods);
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "cash":
        return <Banknote className="w-5 h-5 text-green-600" />;
      case "virtual":
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <Modal
      image={SettingFiles.PaymentMethods}
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Methods"
      subtitle="Manage your payment methods"
    >
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-green-800 mb-2">
            Activate Payment Methods for your Business
          </h3>
          <p className="text-sm text-green-700">
            Choose which payment methods you want to accept
          </p>
        </div>

        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getIcon(method.type)}
              <span className="font-medium">{method.name}</span>
            </div>
            <Switch
              checked={method.enabled}
              onChange={(enabled) => handleToggle(method.id, enabled)}
            />
          </div>
        ))}

        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-600 mb-2">Add custom payment method</p>
          <Button variant="secondary">+ Add a Payment Method</Button>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
