import { OnboardBusinessData } from "@/types/businessTypes";
import { HttpService } from "./httpService";

class BusinessService {
  private request = new HttpService();

  async onboardBusiness(data: OnboardBusinessData) {
    return this.request.post(
      "/business/onboard",
      {
        businessId: data.businessId,
        outletId: data.outletId,
        country: data.country,
        logoUrl: data.logoUrl,
        address: data.address,
        businessType: data.businessType,
        currency: data.currency,
        revenueRange: data.revenueRange,
      },
      "bountipRegisteredUsers"
    );
  }

  async getUserBusiness(cookieName= "bountipRegisteredUsers") {
    return this.request.get("/business", cookieName);
  }
}

export const businessService = new BusinessService();
