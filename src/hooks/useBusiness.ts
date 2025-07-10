import { useBusinessStore } from "@/stores/useBusinessStore";

export const useBusiness = () => useBusinessStore((state) => state.business);
