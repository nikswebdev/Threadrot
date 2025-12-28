// src/components/Layout/Navbar/NavLinkWithDropdown.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DropdownItem from "./DropdownItem";
import "./MainNavbar.css";

interface DropdownLink {
  label: string;
  to: string;
}

interface NavLinkWithDropdownProps {
  label: string;
  link?: string; // Optional main link
  dropdownItems?: DropdownLink[];
}

const NavLinkWithDropdown: React.FC<NavLinkWithDropdownProps> = ({
  label,
  link,
  dropdownItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const hasDropdown = dropdownItems && dropdownItems.length > 0;

  return (
    <div
      className={`nav-item-dropdown-wrapper ${isOpen ? "open" : ""}`}
      onMouseLeave={handleClose}
    >
      <div
        className="nav-item-dropdown-header"
        onClick={hasDropdown ? handleToggle : undefined}
      >
        {link ? (
          <a
            href={link}
            className="nav-link"
            onClick={!hasDropdown ? handleClose : undefined}
          >
            {label}
          </a>
        ) : (
          <span className="nav-link">{label}</span>
        )}
        {hasDropdown && (
          <ChevronDown
            size={14}
            className={`chevron ${isOpen ? "rotate" : ""}`}
          />
        )}
      </div>

      {hasDropdown && isOpen && (
        <div className="dropdown-menu">
          {dropdownItems.map((item, index) => (
            <DropdownItem
              key={index}
              label={item.label}
              to={item.to}
              onClick={handleClose}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLinkWithDropdown;
