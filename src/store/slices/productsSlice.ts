import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../types";
import { productsData } from "../../utils/data";

const initialState: ProductsState = {
  items: productsData,
  filteredItems: productsData,
  selectedProduct: undefined,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      if (action.payload === "ALL") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (product: Product) => product.category === action.payload
        );
      }
    },
    setSelectedProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { filterProducts, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

export {}; // Make it a module
