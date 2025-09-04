// store/slices/sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    active: localStorage.getItem("activeSection") || "overview", // Restore from localStorage
  },
  reducers: {
    setActiveSection: (state, action) => {
      state.active = action.payload;
      localStorage.setItem("activeSection", action.payload); // Save to localStorage
    },
  },
});

export const { setActiveSection } = sectionSlice.actions;
export default sectionSlice.reducer;
