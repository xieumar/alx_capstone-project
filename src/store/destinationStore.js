
import { create } from "zustand";

export const useDestinationStore = create((set) => ({
  destinations: [],
  selectedCity: null,

  setDestinations: (destinations) => set({ destinations }),
  setSelectedCity: (city) => set({ selectedCity: city }),
}));
