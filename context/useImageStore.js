// store.js
import { create } from "zustand";

const useImageStore = create((set) => ({
  selectedImages: [],
  setSelectedImages: (images) => set({ selectedImages: images }),
  addAdidasImage: (image) =>
    set((state) => ({
      selectedImages: [...state.selectedImages, image],
    })),
  removeAdidasImage: (id) =>
    set((state) => ({
      selectedImages: state.selectedImages.filter((img) => img.id !== id),
    })),
  clearAdidasImages: () => set({ selectedImages: [] }),
}));

export default useImageStore;
