import { BusinessDetailsType } from "@/types/businessTypes";
import { HttpService } from "./httpService";
import { COOKIE_NAMES } from "@/utils/cookiesUtils";

class SettingsService {
  private request = new HttpService();
  async updateBusinessDetails(data: BusinessDetailsType, outletId: number|number) {
    return this.request.patch(`/outlet/${outletId}`,{
     
        name: data.name,
        address: data.address,
        phoneNumber: data.phone,
        city: data.city,
        state: data.state,
        country:data.country,
        postalCode: data.postalCode,
        businessType: data.businessType,
        logoUrl: data.logoUrl
      
    }, COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS,);
  }
}

const settingsService = new SettingsService();
export default settingsService;
