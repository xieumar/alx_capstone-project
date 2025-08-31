import { create } from "zustand";

const loadTrips = () => {
  try {
    const trips = localStorage.getItem("trips");
    return trips ? JSON.parse(trips) : [];
  } catch {
    return [];
  }
};

const useTripStore = create((set) => ({
  trips: loadTrips(),

  addTrip: (trip) => {
    set((state) => {
      const updatedTrips = [...state.trips, trip];
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      return { trips: updatedTrips };
    });
  },

  removeTrip: (id) => {
    set((state) => {
      const updatedTrips = state.trips.filter((t) => t.id !== id);
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      return { trips: updatedTrips };
    });
  },

  clearTrips: () => {
    localStorage.removeItem("trips");
    set({ trips: [] });
  },
}));

export default useTripStore;
