import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Switch } from "../ui/Switch";
import SettingFiles from "@/assets/icons/settings";

interface ReceiptCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReceiptCustomizationModal: React.FC<ReceiptCustomizationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'payment'>('customer');
  const [formData, setFormData] = useState({
    businessName: "Bakery Name",
    fontSize: "Small Text Size",
    paperSize: "Tape Size",
    showBusinessLine: true,
    orderInfo: {
      customerNumber: true,
      orderNumber: true,
      storeTime: true,
      storeDate: true
    },
    itemDetails: {
      itemName: true,
      quantity: true,
      price: true,
      orderTotal: true
    },
    paymentBreakdown: {
      itemTotal: true,
      discount: true,
      serviceCharge: true,
      totalPayment: true
    },
    customMessage: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const toggleOrderInfo = (field: keyof typeof formData.orderInfo) => {
    setFormData(prev => ({
      ...prev,
      orderInfo: { ...prev.orderInfo, [field]: !prev.orderInfo[field] }
    }));
  };

  const toggleItemDetails = (field: keyof typeof formData.itemDetails) => {
    setFormData(prev => ({
      ...prev,
      itemDetails: { ...prev.itemDetails, [field]: !prev.itemDetails[field] }
    }));
  };

  const togglePaymentBreakdown = (field: keyof typeof formData.paymentBreakdown) => {
    setFormData(prev => ({
      ...prev,
      paymentBreakdown: { ...prev.paymentBreakdown, [field]: !prev.paymentBreakdown[field] }
    }));
  };

  return (
    <Modal
      image={SettingFiles.ReceiptIcon}
      isOpen={isOpen}
      onClose={onClose}
      title="Receipt Customization"
      subtitle="Customize your receipt layout and information"
    >
      <div className="space-y-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'customer' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('customer')}
          >
            Customer Receipt
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'payment' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Receipt
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">Live Preview</h3>
          <div className="bg-white border border-gray-200 rounded p-4 text-center">
            <div className="text-sm font-bold mb-2">{formData.businessName}</div>
            <div className="text-xs text-gray-600 mb-2">John Doe</div>
            <div className="text-xs text-gray-600 mb-2">ABC RESTAURANT</div>
            <div className="text-xs text-gray-600 mb-2">235-56-78-90-05-06</div>
            <hr className="my-2" />
            <div className="text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>Details</span>
                <span>Naira</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between">
                <span>1</span>
                <span>Sweet</span>
                <span>₦5</span>
                <span>₦5</span>
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-xs">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₦5</span>
              </div>
            </div>
            <div className="text-xs mt-2 text-green-600">
              Thank you for shopping with us!
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Receipt Branding</h4>
            <div className="space-y-4">
              <Input
                label="Show different Business name"
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
            <h4 className="font-medium mb-4">Order Information</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Customer Number</span>
                <Switch
                  checked={formData.orderInfo.customerNumber}
                  onChange={() => toggleOrderInfo('customerNumber')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Order Number</span>
                <Switch
                  checked={formData.orderInfo.orderNumber}
                  onChange={() => toggleOrderInfo('orderNumber')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Store Time</span>
                <Switch
                  checked={formData.orderInfo.storeTime}
                  onChange={() => toggleOrderInfo('storeTime')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Store Date</span>
                <Switch
                  checked={formData.orderInfo.storeDate}
                  onChange={() => toggleOrderInfo('storeDate')}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Itemized Details List</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Item Name</span>
                <Switch
                  checked={formData.itemDetails.itemName}
                  onChange={() => toggleItemDetails('itemName')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Display Quantity</span>
                <Switch
                  checked={formData.itemDetails.quantity}
                  onChange={() => toggleItemDetails('quantity')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Item Price</span>
                <Switch
                  checked={formData.itemDetails.price}
                  onChange={() => toggleItemDetails('price')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Order Total</span>
                <Switch
                  checked={formData.itemDetails.orderTotal}
                  onChange={() => toggleItemDetails('orderTotal')}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Payment Breakdown</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Item Total</span>
                <Switch
                  checked={formData.paymentBreakdown.itemTotal}
                  onChange={() => togglePaymentBreakdown('itemTotal')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Discount</span>
                <Switch
                  checked={formData.paymentBreakdown.discount}
                  onChange={() => togglePaymentBreakdown('discount')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Service Charge</span>
                <Switch
                  checked={formData.paymentBreakdown.serviceCharge}
                  onChange={() => togglePaymentBreakdown('serviceCharge')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Show Total Payment</span>
                <Switch
                  checked={formData.paymentBreakdown.totalPayment}
                  onChange={() => togglePaymentBreakdown('totalPayment')}
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