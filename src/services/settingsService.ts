import { BusinessDetailsType } from "@/types/businessTypes";
import { HttpService } from "./httpService";

class settingsService {
  private request = new HttpService();
  async updateBusinessDetails(data: BusinessDetailsType) {
    console.log(data)
    return this.request.post("/business/onboard", {});
  }
}

const settingsServiceInstance = new settingsService();
export default settingsServiceInstance;
