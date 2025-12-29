// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../../types";

const initialState: UIState = {
  activeCategory: "ALL",
  screenWidth: typeof window !== "undefined" ? window.innerWidth : 1200,
  isLoading: false,
  gridView: "grid", // Default to grid view
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setScreenWidth: (state, action: PayloadAction<number>) => {
      state.screenWidth = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGridView: (state, action: PayloadAction<"grid" | "compact">) => {
      state.gridView = action.payload;
    },
  },
});

export const { setActiveCategory, setScreenWidth, setLoading, setGridView } =
  uiSlice.actions;
export default uiSlice.reducer;
