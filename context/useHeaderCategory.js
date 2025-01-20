import { create } from "zustand";

const useHeaderCategory = create((set) => ({
  selectedItems: [],
  setSelectedItems: (newItems) => set({ selectedItems: newItems }),
}));

export default useHeaderCategory;
