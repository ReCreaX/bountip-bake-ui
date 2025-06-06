import { create } from "zustand";

interface UIState {
  showsignUpSuccessModal: boolean;
  setShowSignUpSuccessModal: (value: boolean) => void;
}

export const useModalStore = create<UIState>((set) => ({
  showsignUpSuccessModal: false,
  setShowSignUpSuccessModal: (value) => set({ showsignUpSuccessModal: value }),
}));
