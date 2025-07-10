import { create } from "zustand";
import { Business } from "@/types/business";
import { OutletAccess } from "@/types/outlet";
import { businessService } from "@/services/businessService";
import { COOKIE_NAMES } from "@/utils/cookiesUtils";

type BusinessApiResponseType = {
  status: boolean;
  message: string;
  data?: {
    business: Business;
    outlets: OutletAccess[]; // Always array
  };
  error?: boolean;
  statusCode?: number;
};

type BusinessStore = {
  business: Business | null;
  outlets: OutletAccess[];
  selectedOutletId: number | null;
  loading: boolean;
  error: string | null;
  fetchBusinessData: () => Promise<void>;
  setSelectedOutletId: (id: number) => void;
};

export const useBusinessStore = create<BusinessStore>((set) => ({
  business: null,
  outlets: [],
  selectedOutletId: null,
  loading: false,
  error: null,

  fetchBusinessData: async () => {
    set({ loading: true, error: null });
    try {
      const res = (await businessService.getUserBusiness(
        COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS
      )) as BusinessApiResponseType;

      if (res.status && res.data) {
        const outlets = Array.isArray(res.data.outlets)
          ? res.data.outlets
          : [res.data.outlets];

        const mainOutlet = outlets.find((o) => o.outlet.isMainLocation);
        const selectedId = mainOutlet?.outlet.id || outlets[0]?.outlet.id || null;

        set({
          business: res.data.business,
          outlets,
          selectedOutletId: selectedId,
          loading: false,
        });
      } else {
        set({
          loading: false,
          error: res.message || "Unknown error occurred",
        });
      }
    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error: "Failed to fetch business data",
      });
    }
  },

  setSelectedOutletId: (id) => set({ selectedOutletId: id }),

  
}));

