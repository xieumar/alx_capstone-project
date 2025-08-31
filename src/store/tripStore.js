import { create } from "zustand";

const useTripStore = create((set) => ({
  trips: [],

  addTrip: (trip) =>
    set((state) => ({ trips: [...state.trips, trip] })),

  updateTrip: (id, updatedTrip) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, ...updatedTrip } : t)),
    })),

  removeTrip: (id) =>
    set((state) => ({ trips: state.trips.filter((t) => t.id !== id) })),
}));

export default useTripStore;
