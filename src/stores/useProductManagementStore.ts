import { create } from "zustand";
import { Product } from "@/types/product";// Adjust import path as needed

interface IProductManagementStore {
  productClicked: boolean;
  setProductClicked: (value: boolean) => void;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useProductManagementStore = create<IProductManagementStore>(
  (set) => ({
    productClicked: false,
    setProductClicked: (value: boolean) => set({ productClicked: value }),

    selectedProduct: null,
    setSelectedProduct: (product: Product | null) =>
      set({ selectedProduct: product }),
  })
);
