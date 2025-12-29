// src/store/slices/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../../types";
import { productsData } from "../../utils/data";

const initialState: ProductsState = {
  items: productsData,
  filteredItems: productsData,
  selectedProduct: undefined,
  filters: {
    category: "ALL",
    style: "",
    color: "",
    brand: "",
    size: "",
    inStock: false,
  },
  sortBy: "Recommended",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Legacy category filter (kept for compatibility)
    filterProducts: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
      applyFiltersAndSort(state);
    },

    // Set individual filter with proper typing
    setFilter: (
      state,
      action: PayloadAction<{
        filterType: keyof ProductsState["filters"];
        value: string | boolean;
      }>
    ) => {
      const { filterType, value } = action.payload;
      // Type assertion to handle the union type
      (state.filters[filterType] as string | boolean) = value;
      applyFiltersAndSort(state);
    },

    // Clear all filters
    clearFilters: (state) => {
      state.filters = {
        category: "ALL",
        style: "",
        color: "",
        brand: "",
        size: "",
        inStock: false,
      };
      applyFiltersAndSort(state);
    },

    // Set sort option
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
      applyFiltersAndSort(state);
    },

    setSelectedProduct: (state, action: PayloadAction<Product | undefined>) => {
      state.selectedProduct = action.payload;
    },
  },
});

// Helper function to apply all filters and sorting
function applyFiltersAndSort(state: ProductsState) {
  let filtered = [...state.items];

  // Apply category filter
  if (state.filters.category && state.filters.category !== "ALL") {
    filtered = filtered.filter(
      (product) => product.category === state.filters.category
    );
  }

  // Apply style filter
  if (state.filters.style) {
    filtered = filtered.filter(
      (product) => product.style === state.filters.style
    );
  }

  // Apply color filter
  if (state.filters.color) {
    filtered = filtered.filter(
      (product) => product.color === state.filters.color
    );
  }

  // Apply brand filter
  if (state.filters.brand) {
    filtered = filtered.filter(
      (product) => product.brand === state.filters.brand
    );
  }

  // Apply size filter
  if (state.filters.size) {
    filtered = filtered.filter(
      (product) => product.sizes && product.sizes.includes(state.filters.size)
    );
  }

  // Apply in-stock filter
  if (state.filters.inStock) {
    filtered = filtered.filter((product) => product.inStock === true);
  }

  // Apply sorting
  filtered = sortProducts(filtered, state.sortBy);

  state.filteredItems = filtered;
}

// Helper function to sort products
function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "Newest Arrivals":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.dateAdded || "2024-01-01").getTime();
        const dateB = new Date(b.dateAdded || "2024-01-01").getTime();
        return dateB - dateA; // Newest first
      });

    case "Price: Low to High":
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceA - priceB;
      });

    case "Price: High to Low":
      return sorted.sort((a, b) => {
        const priceA = parseFloat(a.price.replace("$", ""));
        const priceB = parseFloat(b.price.replace("$", ""));
        return priceB - priceA;
      });

    case "Rot Level: High":
      return sorted.sort((a, b) => {
        const rotA = parseFloat(a.rot.replace("%", ""));
        const rotB = parseFloat(b.rot.replace("%", ""));
        return rotB - rotA; // Highest rot first
      });

    case "Recommended":
    default:
      // Keep original order (or implement custom recommendation logic)
      return sorted;
  }
}

export const {
  filterProducts,
  setFilter,
  clearFilters,
  setSortBy,
  setSelectedProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
