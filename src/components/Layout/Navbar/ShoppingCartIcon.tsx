// src/components/Layout/Navbar/ShoppingCartIcon.tsx - WITH CART FUNCTIONALITY
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { toggleCart } from "../../../store/slices/cartSlice";
import "./MainNavbar.css";

const ShoppingCartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total: number, item) => total + item.quantity, 0)
  );

  const handleClick = () => {
    dispatch(toggleCart());
  };

  return (
    <button
      className="shopping-cart-icon"
      onClick={handleClick}
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={20} />
      {cartCount > 0 && (
        <span className="cart-item-count">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
};

export default ShoppingCartIcon;
