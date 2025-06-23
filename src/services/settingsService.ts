import { BusinessDetailsType } from "@/types/businessTypes";
import { HttpService } from "./httpService";
import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { OperatingHoursType } from "@/types/settingTypes";

class SettingsService {
  private request = new HttpService();
  async updateBusinessDetails(
    data: BusinessDetailsType,
    outletId: number | number
  ) {
    return this.request.patch(
      `/outlet/${outletId}`,
      {
        name: data.name,
        address: data.address,
        phoneNumber: data.phone,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        businessType: data.businessType,
        logoUrl: data.logoUrl,
      },
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }

  async updateOperatingHours(
    outletId: number | string,
    data: OperatingHoursType
  ) {
    return this.request.patch(
      `/outlet/${outletId}/operating-hours`,
      data,
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }

  async addNewBusinessLocation({
    businessId,
    name,
    address,
    phoneNumber,
  }: {
    businessId: string;
    name: string;
    address: string;
    phoneNumber: string;
  }) {
    return this.request.post(
      `/outlet`,
      { businessId, name, address, phoneNumber },
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }

  async updatePasswordSettings(data: {
    oldPassword: string;
    newPassword: string;
  }) {
    return this.request.patch(
      `/auth/change-password`,
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }
}

const settingsService = new SettingsService();
export default settingsService;
