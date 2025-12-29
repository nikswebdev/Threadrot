// src/store/slices/productsSlice.ts - COMPLETE WITH ALL EXPORTS
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../types";
import { products } from "../../utils/data";

const initialState: ProductsState = {
  items: products,
  filteredItems: products,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.selectedProduct = action.payload || null;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      const category = action.payload.toLowerCase();
      if (category === "all") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (product) => product.category.toLowerCase() === category
        );
      }
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      state.filteredItems = sortProductsArray(
        state.filteredItems,
        action.payload
      );
    },
    // Add setSortBy as alias for sortProducts (for backward compatibility)
    setSortBy: (state, action: PayloadAction<string>) => {
      state.filteredItems = sortProductsArray(
        state.filteredItems,
        action.payload
      );
    },
  },
});

// Export all actions
export const {
  setSelectedProduct,
  filterProducts,
  sortProducts,
  setSortBy, // Export this!
} = productsSlice.actions;

export default productsSlice.reducer;

// Helper function to sort products
function sortProductsArray(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "Recommended":
      return sorted;

    case "Newest Arrivals":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.dateAdded || "2024-01-01").getTime();
        const dateB = new Date(b.dateAdded || "2024-01-01").getTime();
        return dateB - dateA;
      });

    case "Price: Low to High":
      return sorted.sort((a, b) => a.price - b.price);

    case "Price: High to Low":
      return sorted.sort((a, b) => b.price - a.price);

    case "Rot Level: High":
      return sorted;

    default:
      return sorted;
  }
}
