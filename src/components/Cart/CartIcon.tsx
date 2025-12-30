// src/components/Cart/CartIcon.tsx - CART ICON WITH BADGE
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleCart } from "../../store/slices/cartSlice";
import "./CartIcon.css";

const CartIcon: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleClick = () => {
    dispatch(toggleCart());
  };

  return (
    <button
      className="cart-icon-button"
      onClick={handleClick}
      aria-label="Shopping cart"
    >
      <ShoppingCart size={22} />
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount > 99 ? "99+" : cartCount}</span>
      )}
    </button>
  );
};

export default CartIcon;
