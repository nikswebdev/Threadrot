import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {};
