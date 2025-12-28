// src/components/Layout/Navbar/DropdownItem.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./MainNavbar.css";

interface DropdownItemProps {
  label: string;
  to: string;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, to, onClick }) => (
  <Link to={to} className="dropdown-item" onClick={onClick}>
    {label}
  </Link>
);

export default DropdownItem;
