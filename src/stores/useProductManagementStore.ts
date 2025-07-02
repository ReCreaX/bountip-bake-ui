import { create } from "zustand";
import { Product, ProductHistory } from "@/types/product";
import productManagementService from "@/services/productManagementService";
import { ApiResponseType } from "@/types/httpTypes";

interface ProductResponse {
  status: boolean;
  data?: {
    data: Product[];
    meta: {
      totalPages: number;
      total: number;
    };
  };
}



interface IProductManagementStore {
  // UI State
  productClicked: boolean;
  setProductClicked: (value: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedProductPriceHistory: ProductHistory[] | null;
  setSelectedProductPriceHistory: (priceHistory: ProductHistory[]) => void;

  // Products Data
  products: Product[];
  allProducts: Product[];
  loading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  productsPerPage: number;

  // Actions
  fetchProducts: (outletId: number, page?: number, limit?: number, search?:string) => Promise<void>;
  deleteProduct: (outletId: number, productId: number) => Promise<boolean>;
  updateProductStatus: (productId: number, isActive: boolean) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  setCurrentPage: (page: number) => void;
  clearProducts: () => void;

  // Reset functions
  resetError: () => void;


  fetchProductPriceHistory: (productId: number) => Promise<void>;

}

export const useProductManagementStore = create<IProductManagementStore>((set, get) => ({
  // UI State
  productClicked: false,
  setProductClicked: (value: boolean) => set({ productClicked: value }),

  selectedProduct: null,
  setSelectedProduct: (product: Product | null) => set({ selectedProduct: product }),

  selectedProductPriceHistory: null,
  setSelectedProductPriceHistory: (priceHistory: ProductHistory[]) =>
    set({ selectedProductPriceHistory: priceHistory }),

  // Products Data
  products: [],
  allProducts: [],
  loading: false,
  error: null,

  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  productsPerPage: 10,

  // Fetch Products
  fetchProducts: async (outletId: number, page = 1, limit = 10, search) => {
    set({ loading: true, error: null });

    try {
      const response = (await productManagementService.fetchProducts(outletId, {
        page,
        limit,
        search: search || "",
      })) as ProductResponse;

      if (response.status && response.data) {
        const { data: productsData, meta } = response.data;

        set({
          products: productsData || [],
          allProducts: productsData || [],
          totalPages: meta.totalPages || 1,
          totalProducts: meta.total || 0,
          currentPage: page,
          loading: false,
        });
      } else {
        set({
          products: [],
          allProducts: [],
          loading: false,
          error: "Failed to fetch products",
        });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      set({
        loading: false,
        error: "Failed to fetch products",
      });
    }
  },

  // Delete Product
  deleteProduct: async (outletId: number, productId: number) => {
    try {
      const response = await productManagementService.deleteProduct(outletId, productId) as ApiResponseType;

      if (response.status) { // Replace `true` with `response.status` when uncommenting API call
        const state = get();
        const updatedProducts = state.products.filter((p) => p.id !== productId);
        const updatedAllProducts = state.allProducts.filter((p) => p.id !== productId);

        set({
          products: updatedProducts,
          allProducts: updatedAllProducts,
          totalProducts: state.totalProducts - 1,
          selectedProduct: state.selectedProduct?.id === productId ? null : state.selectedProduct,
        });

        return true;
      }

      return false;
    } catch (err) {
      console.error("Error deleting product:", err);
      set({ error: "Failed to delete product" });
      return false;
    }
  },

  // Update Product Status
  updateProductStatus: (productId: number, isActive: boolean) => {
    const state = get();

    const updateProductInArray = (products: Product[]) =>
      products.map((product) =>
        product.id === productId ? { ...product, isActive } : product
      );

    set({
      products: updateProductInArray(state.products),
      allProducts: updateProductInArray(state.allProducts),
      selectedProduct:
        state.selectedProduct?.id === productId
          ? { ...state.selectedProduct, isActive }
          : state.selectedProduct,
    });
  },

  // Add Product
  addProduct: (product: Product) => {
    const state = get();
    set({
      products: [product, ...state.products],
      allProducts: [product, ...state.allProducts],
      totalProducts: state.totalProducts + 1,
    });
  },

  // Update Product
  updateProduct: (updatedProduct: Product) => {
    const state = get();

    const updateProductInArray = (products: Product[]) =>
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

    set({
      products: updateProductInArray(state.products),
      allProducts: updateProductInArray(state.allProducts),
      selectedProduct:
        state.selectedProduct?.id === updatedProduct.id
          ? updatedProduct
          : state.selectedProduct,
    });
  },

  // Pagination control
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  // Clear all product data
  clearProducts: () => {
    set({
      products: [],
      allProducts: [],
      totalPages: 1,
      totalProducts: 0,
      currentPage: 1,
      loading: false,
      error: null,
    });
  },

  // Reset error state
  resetError: () => {
    set({ error: null });
  },

  fetchProductPriceHistory: async (productId: number) => {
    try {
      const state = get();
      const outletId = state.selectedProduct?.outletId;
  
      if (!outletId) {
        set({ error: "No outlet ID available for fetching price history" });
        return;
      }
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response:any = await productManagementService.fetchProductPriceHistory(
        outletId,
        productId
      );
  
      if (response.status && response.data?.data) {
        set({
          selectedProductPriceHistory: response.data.data,
          error: null,
        });
      } else {
        set({
          selectedProductPriceHistory: [],
          error: "Failed to fetch price history",
        });
      }
    } catch (err) {
      console.error("Error fetching product price history:", err);
      set({
        selectedProductPriceHistory: [],
        error: "Error fetching price history",
      });
    }
  },
  
}));
