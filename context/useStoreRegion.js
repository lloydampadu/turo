import { create } from "zustand";

const useRegionStore = create((set) => ({
  initialRegion: null,
  setInitialRegion: (region) => set({ initialRegion: region }),
}));

export default useRegionStore;
