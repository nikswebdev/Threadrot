// src/types/index.ts
export interface Category {
  id: string;
  label: string;
  year?: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  era: string;
  category: string;
  rot: string;
  description?: string;
  images?: string[];
  // NEW: Filter properties
  style?: string;
  color?: string;
  brand?: string;
  sizes?: string[];
  inStock?: boolean;
  dateAdded?: string; // For sorting by newest
}

export interface AppState {
  ui: UIState;
  products: ProductsState;
}

export interface UIState {
  activeCategory: string;
  screenWidth: number;
  isLoading: boolean;
  gridView: "grid" | "compact"; // NEW: Grid view state
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct?: Product;
  // NEW: Active filters
  filters: {
    category: string;
    style: string;
    color: string;
    brand: string;
    size: string;
    inStock: boolean;
  };
  sortBy: string; // NEW: Active sort option
}
