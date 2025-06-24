import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import SettingFiles from "@/assets/icons/settings";
import FileUploadComponent from "@/components/Upload/FileUploadComponent";

interface ReceiptCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptCustomizationModal: React.FC<
  ReceiptCustomizationModalProps
> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"customer" | "payment">(
    "customer"
  );
  const [formData, setFormData] = useState({
    showRestaurantName: false,
    fontStyle: "",
    paperSize: "",
    showPaymentSucessText: false,
    customizeSuccessText: "",
    showTotalPaidAtTop: false,
    showOrderCustomizationName: false,
    showOrderName: false,
    showOrderDateTime: false,
    showCashierName: false,
    showCompanyPhoneNo: false,
    showCompanyEmail: false,
    showCompanyBankDetails: false,
    showCompanyBarCode: false,
    showModifiersBelowItems: false,
    selectedColums: {
      orderName: false,
      sku: false,
      qty: false,
      subTotal: false,
      total: false,
    },
    showDiscountLine: false,
    showTax: false,
    showPaymentMethod: false,
    customMessage: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal
      size={"xl"}
      image={SettingFiles.ReceiptIcon}
      isOpen={isOpen}
      onClose={onClose}
      title="Receipt Customization"
      subtitle="Customize your receipt layout and information"
    >
      <section className="flex ">
        <div className="space-y-6 flex-1/2">
          <div className="flex bg-[#FAFAFC] rounded-[10px] px-5">
            <div className="flex flex-col items-center pt-2.5">
              <button
                className={`font-medium text-sm ${
                  activeTab === "customer" ? "text-[#15BA5C]" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("customer")}
              >
                Customer Receipt
              </button>
              <span
                className={`mt-2 h-[6px] w-[140px] rounded-tl-full rounded-tr-full transition-all duration-200 mx-auto ${
                  activeTab === "customer" ? "bg-[#15BA5C]" : "bg-transparent"
                }`}
              />
            </div>

            <div className="flex flex-col items-center  pt-2.5">
              <button
                className={`font-medium text-sm ${
                  activeTab === "payment" ? "text-green-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab("payment")}
              >
                Payment Receipt
              </button>
              <span
                className={`mt-2 h-[6px] w-[140px] rounded-tl-full rounded-tr-full transition-all duration-200 mx-auto ${
                  activeTab === "payment" ? "bg-[#15BA5C]" : "bg-transparent"
                }`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h4 className="font-medium mb-4">Receipt Branding</h4>
              <FileUploadComponent setImageUrl={setImageUrl} />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#737373]">
                    Show restaurant name
                  </label>
                  <Switch
                    checked={formData.showRestaurantName}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        showRestaurantName: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border border-dashed border-[#D1D1D1] rounded-[10px] px-3.5 py-2.5">
              <h4 className="font-medium mb-4">Payment Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Show discount line
                  </span>
                  <Switch
                    checked={formData.showDiscountLine}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        showDiscountLine: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Show Tax/VAT</span>
                  <Switch
                    checked={formData.showTax}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        showTax: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Show Payment Method
                  </span>
                  <Switch
                    checked={formData.showPaymentMethod}
                    onChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        showPaymentMethod: checked,
                      }))
                    }
                  />
                </div>
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customMessage: e.target.value,
                  }))
                }
                placeholder="Enter your custom message"
              />
            </div>

            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </div>

        <div className="flex-1/2"></div>
      </section>
    </Modal>
  );
};
