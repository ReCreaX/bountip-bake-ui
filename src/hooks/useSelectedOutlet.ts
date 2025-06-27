import { useBusinessStore } from "@/stores/useBusinessStore";

export const useSelectedOutlet = () =>
    useBusinessStore((state) =>
      state.outlets.find((o) => o.outlet.id === state.selectedOutletId) || null
    );
  