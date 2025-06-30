import { COOKIE_NAMES } from "@/utils/cookiesUtils";
import { HttpService } from "./httpService";
import { Product } from "@/types/product";

class ProductManagementService {
  private request = new HttpService();
  async createProduct(
    outletId: number,
    data: Pick<
      Product,
      | "name"
      | "description"
      | "price"
      | "category"
      | "isActive"
      | "preparationArea"
      | "priceTierId"
      | "allergenList"
      | "logoUrl"
      | "isMainLocation"
    >
  ) {
    return this.request.post(
      `/outlets/${outletId}/products`,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        isActive: data.isActive,
        preparationArea: data.preparationArea,
        priceTierId: data.priceTierId,
        allergenList: {
          allergies: data.allergenList?.allergies,
        },
        logoUrl: data.logoUrl,
        isMainLocation: data.isMainLocation,
      },
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }

  async fetchProducts(
    outletId: number,
    options?: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      isActive?: boolean;
    }
  ) {
    const params = new URLSearchParams();

    if (options?.page !== undefined)
      params.append("page", options.page.toString());
    if (options?.limit !== undefined)
      params.append("limit", options.limit.toString());
    if (options?.search) params.append("search", options.search);
    if (options?.category) params.append("category", options.category);
    if (options?.isActive !== undefined)
      params.append("isActive", options.isActive.toString());

    const queryString = params.toString() ? `?${params.toString()}` : "";

    return this.request.get(
      `/outlets/${outletId}/products${queryString}`,
      COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
    );
  }
}

const productManagementService = new ProductManagementService();
export default productManagementService;
