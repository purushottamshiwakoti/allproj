import {create} from "zustand";

export interface ModalStore {
  isOpen: boolean;
  setIsOpen: () => void;
}

const useProjectlDialog = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useProjectlDialog;
