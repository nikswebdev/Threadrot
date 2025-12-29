// src/components/Hero/FixedNavButtons.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import "./FixedNavButtons.css";

const FixedNavButtons: React.FC = () => {
  const screenWidth = useAppSelector((state) => state.ui.screenWidth);

  // Different button sets based on screen size
  const navButtons =
    screenWidth <= 600
      ? [
          // Under 600px: Remove "Oversized Tees"
          { label: "New Arrivals", to: "/new-arrivals" },
          { label: "Classic Tees", to: "/clothing/t-shirts" },
          { label: "Hoodies", to: "/clothing/hoodies" },
        ]
      : [
          // Above 600px: Show all buttons
          { label: "New Arrivals", to: "/new-arrivals" },
          { label: "Classic Tees", to: "/clothing/t-shirts" },
          { label: "Oversized Tees", to: "/clothing/oversized-tees" },
          { label: "Hoodies", to: "/clothing/hoodies" },
        ];

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
