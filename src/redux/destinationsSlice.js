import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myDestinations: [],
};
const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    addDestination: (state, action) => {
      // Controllo per evitare duplicati
      const existingDestination = state.myDestinations.find((dest) => dest === action.payload.name);
      if (!existingDestination) {
        state.myDestinations = [...state.myDestinations, action.payload.name];
      }
    },
    removeDestination: (state, action) => {
      state.myDestinations = state.myDestinations.filter((dest) => dest !== action.payload);
    },
  },
});

export const { addDestination, removeDestination } = destinationsSlice.actions;
export const destinationsReducer = destinationsSlice.reducer;
