import { create } from "zustand";

const useMapHeaderCategoryStore = create((set) => ({
  mapHeaderCategory: "Games",
  setMapHeaderCategory: (category) => set({ mapHeaderCategory: category }),
}));

export default useMapHeaderCategoryStore;
