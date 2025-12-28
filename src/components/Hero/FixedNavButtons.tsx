// src/components/Hero/FixedNavButtons.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./FixedNavButtons.css";

const navButtons = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Classic Tees", to: "/clothing/t-shirts" },
  // ADDED THIS BUTTON
  { label: "Oversized Tees", to: "/clothing/oversized-tees" },
  { label: "Hoodies", to: "/clothing/hoodies" },
  { label: "Shoes", to: "/clothing/shoes" },
];

const FixedNavButtons: React.FC = () => {
  return (
    <div className="fixed-nav-buttons-container">
      {navButtons.map((item, index) => (
        <Link key={index} to={item.to} className="fixed-nav-button">
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default FixedNavButtons;
