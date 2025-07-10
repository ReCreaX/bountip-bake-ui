import { useBusinessStore } from "@/stores/useBusinessStore";

export const useSelectedOutlet = () =>
  useBusinessStore(
    (state) =>
      state.outlets.find((o) => o.outlet.id === state.selectedOutletId) || null
  );

export const useOutlets = () => useBusinessStore((state) => state.outlets);


export const usePureOutlets = () => {
  const outletAccesses = useOutlets();
  return outletAccesses.map((oa) => oa.outlet);
};
