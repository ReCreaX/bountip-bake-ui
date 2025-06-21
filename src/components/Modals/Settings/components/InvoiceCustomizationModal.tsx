// InvoiceCustomizationModal.tsx
import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Upload } from "lucide-react";
import SettingFiles from "@/assets/icons/settings";

interface InvoiceCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InvoiceSettings {
  branding: {
    usePreview: boolean;
    businessName: string;
  };
  customerInfo: {
    customerName: string;
    customerAddress: string;
    date: string;
    orderNumber: string;
  };
  header: {
    invoiceNumber: string;
    customerBusinessName: string;
    customBusinessName: string;
    showBusinessLogo: boolean;
  };
  invoiceInformation: {
    billingAddress: string;
    dueDate: string;
    orderNumber: string;
    orderStatus: string;
  };
  businessDetails: {
    businessName: string;
    businessAddress: string;
    businessOwner: string;
  };
  paymentBreakdown: {
    showSubtotal: boolean;
    showDiscount: boolean;
    paymentMethod: string;
    paymentAmount: string;
    businessTaxId: string;
    businessBankAccount: string;
    businessTaxName: string;
    accountName: string;
    accountAddress: string;
  };
  customMessage: string;
}

export const InvoiceCustomizationModal: React.FC<
  InvoiceCustomizationModalProps
> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<InvoiceSettings>({
    branding: {
      usePreview: true,
      businessName: "Bakery Mama",
    },
    customerInfo: {
      customerName: "John Doe",
      customerAddress: "123 Customer St, City, State 12345",
      date: "2024-01-15",
      orderNumber: "INV-001",
    },
    header: {
      invoiceNumber: "",
      customerBusinessName: "",
      customBusinessName: "",
      showBusinessLogo: false,
    },
    invoiceInformation: {
      billingAddress: "",
      dueDate: "",
      orderNumber: "",
      orderStatus: "",
    },
    businessDetails: {
      businessName: "",
      businessAddress: "",
      businessOwner: "",
    },
    paymentBreakdown: {
      showSubtotal: true,
      showDiscount: true,
      paymentMethod: "",
      paymentAmount: "",
      businessTaxId: "",
      businessBankAccount: "",
      businessTaxName: "",
      accountName: "",
      accountAddress: "",
    },
    customMessage: "",
  });

  const handleInputChange = (
    section: keyof InvoiceSettings,
    field: string,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    onClose();
  };

  const sampleItems = [
    { name: "Bread", quantity: 2, price: 5.0, total: 10.0 },
    { name: "Cake", quantity: 1, price: 25.0, total: 25.0 },
  ];

  return (
    <Modal
      image={SettingFiles.InvoiceCustomization}
      isOpen={isOpen}
      onClose={onClose}
      title="Invoice Customization"
      subtitle="Customize your invoices to fit your brand identity"
    >
      <div className="flex gap-6 max-h-[70vh] overflow-hidden">
        {/* Left side - Form */}
        <div className="flex-1 overflow-y-auto pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Invoice Branding */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Invoice Branding</h3>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="usePreview"
                  checked={settings.branding.usePreview}
                  onChange={(e) =>
                    handleInputChange(
                      "branding",
                      "usePreview",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-green-600"
                />
                <label htmlFor="usePreview" className="text-sm">
                  Use Preview
                </label>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop image file to upload
                </p>
                <p className="text-xs text-gray-500">or click to browse</p>
              </div>

              <Input
                label="User Display name"
                value={settings.branding.businessName}
                onChange={(e) =>
                  handleInputChange("branding", "businessName", e.target.value)
                }
                placeholder="Enter business name"
              />
            </div>

            {/* Header */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Header</h3>
              <div className="space-y-4">
                <Input
                  label="Invoice Number"
                  value={settings.header.invoiceNumber}
                  onChange={(e) =>
                    handleInputChange("header", "invoiceNumber", e.target.value)
                  }
                  placeholder="Enter invoice number"
                />
                <Input
                  label="Customer Business Name"
                  value={settings.header.customerBusinessName}
                  onChange={(e) =>
                    handleInputChange(
                      "header",
                      "customerBusinessName",
                      e.target.value
                    )
                  }
                  placeholder="Enter customer business name"
                />
                <Input
                  label="Custom Business Name"
                  value={settings.header.customBusinessName}
                  onChange={(e) =>
                    handleInputChange(
                      "header",
                      "customBusinessName",
                      e.target.value
                    )
                  }
                  placeholder="Enter custom business name"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showLogo"
                    checked={settings.header.showBusinessLogo}
                    onChange={(e) =>
                      handleInputChange(
                        "header",
                        "showBusinessLogo",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-green-600"
                  />
                  <label htmlFor="showLogo" className="text-sm">
                    Show Business Logo
                  </label>
                </div>
              </div>
            </div>

            {/* Invoice Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Invoice Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Billing Address"
                  value={settings.invoiceInformation.billingAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "invoiceInformation",
                      "billingAddress",
                      e.target.value
                    )
                  }
                  placeholder="Enter billing address"
                />
                <Input
                  label="Due Date"
                  type="date"
                  value={settings.invoiceInformation.dueDate}
                  onChange={(e) =>
                    handleInputChange(
                      "invoiceInformation",
                      "dueDate",
                      e.target.value
                    )
                  }
                />
                <Input
                  label="Order Number"
                  value={settings.invoiceInformation.orderNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "invoiceInformation",
                      "orderNumber",
                      e.target.value
                    )
                  }
                  placeholder="Enter order number"
                />
                <Input
                  label="Order Status"
                  value={settings.invoiceInformation.orderStatus}
                  onChange={(e) =>
                    handleInputChange(
                      "invoiceInformation",
                      "orderStatus",
                      e.target.value
                    )
                  }
                  placeholder="Enter order status"
                />
              </div>
            </div>

            {/* Business Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Details</h3>
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  value={settings.businessDetails.businessName}
                  onChange={(e) =>
                    handleInputChange(
                      "businessDetails",
                      "businessName",
                      e.target.value
                    )
                  }
                  placeholder="Enter business name"
                />
                <Input
                  label="Business Address"
                  value={settings.businessDetails.businessAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "businessDetails",
                      "businessAddress",
                      e.target.value
                    )
                  }
                  placeholder="Enter business address"
                />
                <Input
                  label="Business Owner"
                  value={settings.businessDetails.businessOwner}
                  onChange={(e) =>
                    handleInputChange(
                      "businessDetails",
                      "businessOwner",
                      e.target.value
                    )
                  }
                  placeholder="Enter business owner name"
                />
              </div>
            </div>

            {/* Payment Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showSubtotal"
                    checked={settings.paymentBreakdown.showSubtotal}
                    onChange={(e) =>
                      handleInputChange(
                        "paymentBreakdown",
                        "showSubtotal",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-green-600"
                  />
                  <label htmlFor="showSubtotal" className="text-sm">
                    Show Subtotal
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showDiscount"
                    checked={settings.paymentBreakdown.showDiscount}
                    onChange={(e) =>
                      handleInputChange(
                        "paymentBreakdown",
                        "showDiscount",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-green-600"
                  />
                  <label htmlFor="showDiscount" className="text-sm">
                    Payment / Delivery Fee
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Payment Method"
                    value={settings.paymentBreakdown.paymentMethod}
                    onChange={(e) =>
                      handleInputChange(
                        "paymentBreakdown",
                        "paymentMethod",
                        e.target.value
                      )
                    }
                    placeholder="Cash, Card, etc."
                  />
                  <Input
                    label="Payment Amount"
                    value={settings.paymentBreakdown.paymentAmount}
                    onChange={(e) =>
                      handleInputChange(
                        "paymentBreakdown",
                        "paymentAmount",
                        e.target.value
                      )
                    }
                    placeholder="Enter amount"
                  />
                </div>

                <Input
                  label="Business Tax ID No / GST No"
                  value={settings.paymentBreakdown.businessTaxId}
                  onChange={(e) =>
                    handleInputChange(
                      "paymentBreakdown",
                      "businessTaxId",
                      e.target.value
                    )
                  }
                  placeholder="Enter tax ID"
                />
                <Input
                  label="Business Bank Account Number"
                  value={settings.paymentBreakdown.businessBankAccount}
                  onChange={(e) =>
                    handleInputChange(
                      "paymentBreakdown",
                      "businessBankAccount",
                      e.target.value
                    )
                  }
                  placeholder="Enter account number"
                />
                <Input
                  label="Business Tax Name"
                  value={settings.paymentBreakdown.businessTaxName}
                  onChange={(e) =>
                    handleInputChange(
                      "paymentBreakdown",
                      "businessTaxName",
                      e.target.value
                    )
                  }
                  placeholder="Enter tax name"
                />
                <Input
                  label="Account Name"
                  value={settings.paymentBreakdown.accountName}
                  onChange={(e) =>
                    handleInputChange(
                      "paymentBreakdown",
                      "accountName",
                      e.target.value
                    )
                  }
                  placeholder="Enter account name"
                />
                <Input
                  label="Account Address"
                  value={settings.paymentBreakdown.accountAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "paymentBreakdown",
                      "accountAddress",
                      e.target.value
                    )
                  }
                  placeholder="Enter account address"
                />
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom &quot;Thank you&quot; Message
              </label>
              <textarea
                value={settings.customMessage}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    customMessage: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your custom message"
              />
            </div>
          </form>
        </div>

        {/* Right side - Preview */}
        <div className="w-80 bg-white border border-gray-200 rounded-lg p-4 overflow-y-auto">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold text-xl">BM</span>
            </div>
            <h3 className="font-bold text-lg">
              {settings.branding.businessName}
            </h3>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">INVOICE</p>
              <p className="text-gray-600">
                Date: {settings.customerInfo.date}
              </p>
              <p className="text-gray-600">Due: 30 Days</p>
            </div>

            <div>
              <p className="font-semibold">Bill To:</p>
              <p>{settings.customerInfo.customerName}</p>
              <p className="text-gray-600">
                {settings.customerInfo.customerAddress}
              </p>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Item</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Price</th>
                  <th className="text-right py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {sampleItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="text-right py-2">{item.quantity}</td>
                    <td className="text-right py-2">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="text-right py-2">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="space-y-1 pt-2 border-t">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$35.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>$3.50</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>$38.50</span>
              </div>
            </div>

            <div className="pt-4 text-center">
              <p className="text-green-600">
                Thank you for choosing us for your business!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <Button type="button" onClick={onClose} className="px-6">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} className="px-6">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};
