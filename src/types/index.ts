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
}

export interface AppState {
  ui: UIState;
  products: ProductsState;
}

export interface UIState {
  activeCategory: string;
  screenWidth: number;
  isLoading: boolean;
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedProduct?: Product;
}

export {}; // Make it a module
