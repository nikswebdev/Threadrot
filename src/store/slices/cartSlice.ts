// src/store/slices/cartSlice.ts - SHOPPING CART STATE
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  category: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedDiscount: {
    code: string;
    percentage: number;
  } | null;
}

// Load cart from localStorage on init
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("threadrot_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("threadrot_cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false,
  appliedDiscount: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size
      );

      if (existingItem) {
        // Item exists - increase quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // New item - add to cart with unique ID
        const newItem = {
          ...action.payload,
          id: `${action.payload.productId}-${
            action.payload.size
          }-${Date.now()}`,
        };
        state.items.push(newItem);
      }

      saveCartToStorage(state.items);
      state.isOpen = true; // Open cart when item added
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, Math.min(10, action.payload.quantity));
        saveCartToStorage(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.appliedDiscount = null;
      saveCartToStorage([]);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    applyDiscount: (
      state,
      action: PayloadAction<{ code: string; percentage: number }>
    ) => {
      state.appliedDiscount = action.payload;
    },

    removeDiscount: (state) => {
      state.appliedDiscount = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartTotal = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const discount = state.cart.appliedDiscount;
  if (discount) {
    return subtotal * (1 - discount.percentage / 100);
  }
  return subtotal;
};
