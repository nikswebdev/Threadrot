import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {};
