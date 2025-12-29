// src/types/index.ts - COMPLETE WITH ALL UI PROPERTIES

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  dateAdded?: string;

  // Enhanced product card fields
  hoverImage?: string;
  isNew?: boolean;
  isLowStock?: boolean;
  isTrending?: boolean;
  stockCount?: number;
  inStock?: boolean;
}

export interface Category {
  id: string;
  label: string;
  year?: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterOptions {
  styles: FilterOption[];
  colors: FilterOption[];
  brands: FilterOption[];
  sizes: FilterOption[];
}

// Redux state types
export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct: Product | null;
}

export interface UIState {
  activeCategory: string;
  selectedProduct: Product | null;
  gridView: "grid" | "compact";
  screenWidth: number; // Added
  isLoading: boolean; // Added
}
