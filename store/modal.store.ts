import { create } from "zustand";

interface IModalProps {
  modal: React.ReactElement | null;
  setModal: (modal: React.ReactElement) => void;
}
export const useModalStore = create<IModalProps>((set) => ({
  modal: null,
  setModal: (newModal) => set((state) => ({ modal: newModal })),
}));
