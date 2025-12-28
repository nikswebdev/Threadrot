// src/components/Layout/Navbar/ShoppingCartIcon.tsx
import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";

const ShoppingCartIcon: React.FC = () => (
  <Link to="/cart" className="shopping-cart-icon" aria-label="Shopping Cart">
    <ShoppingCart size={20} />
    {/* Optional: Add a badge for item count */}
    {/* <span className="cart-item-count">3</span> */}
  </Link>
);

export default ShoppingCartIcon;
