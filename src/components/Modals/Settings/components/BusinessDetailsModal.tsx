import React, { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { BusinessDetails } from "@/types/settingTypes";
import SettingFiles from "@/assets/icons/settings";
import { businessService } from "@/services/businessService";
import { BusinessAndOutlet, BusinessResponse } from "@/types/businessTypes";
import { COOKIE_NAMES } from "@/utils/cookiesUtils";

interface BusinessDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  businessDetails: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (details: any) => void;
}

export const BusinessDetailsModal: React.FC<BusinessDetailsModalProps> = ({
  isOpen,
  onClose,
  businessDetails,
  onSave,
}) => {
  const [formData, setFormData] = useState<BusinessDetails>(businessDetails);
  const [{ businessId, outletId }, setBusinessOutlet] =
    useState<BusinessAndOutlet>({
      businessId: null,
      outletId: null,
    });
  useEffect(() => {
    if (typeof businessId === "number" && typeof outletId === "number") return;

    const fetchBusiness = async () => {
      try {
        const res = (await businessService.getUserBusiness(
          // "bountipLoginUserTokens"
          COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
        )) as BusinessResponse;
        console.log("This is res ----", res);
        if ("error" in res || !res.status) {
          console.warn("Failed to fetch business:", res);
          return;
        }

        const businessId = res.data?.business?.id ?? null;
        const outletId = res.data?.outlets?.[0]?.outlet?.id ?? null;
        console.log("This is business----", businessId, outletId);
        setBusinessOutlet({ businessId, outletId });
      } catch (err) {
        console.error("Unexpected error while fetching business:", err);
      }
    };

    fetchBusiness();
  }, [businessId, outletId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof BusinessDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      subtitle="Update and Manage Business Information"
      image={SettingFiles.BusinessIcon}
      isOpen={isOpen}
      onClose={onClose}
      title="Business Details"
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter business name"
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="business@example.com"
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="Nigeria">🇳🇬 Nigeria</option>
              <option value="Ghana">🇬🇭 Ghana</option>
              <option value="Kenya">🇰🇪 Kenya</option>
            </select>
          </div>

          <Input
            label="State"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            placeholder="Enter state"
          />

          <Input
            label="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Enter city"
          />

          <Input
            label="Street Address"
            value={formData.streetAddress}
            onChange={(e) => handleChange("streetAddress", e.target.value)}
            placeholder="Enter street address"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => handleChange("businessType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="Bakery">Bakery</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Cafe">Cafe</option>
              <option value="Fast Food">Fast Food</option>
            </select>
          </div>

          <Input
            label="Postal Code"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            placeholder="Enter postal code"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              🏪
            </div>
            <p className="text-gray-600">Upload your business logo</p>
            <input type="file" accept="image/*" className="hidden" />
            <Button variant="secondary" className="mt-2">
              Choose File
            </Button>
          </div>
        </div>

        <div className=" flex flex-col mt-6">
          <button
            className="w-full bg-[#15BA5C] py-2.5 text-[#FFFFFF] font-medium rounded-[10px]"
            onClick={onClose}
            type="button"
          >
            Save Details
          </button>
        </div>
      </form>
    </Modal>
  );
};
