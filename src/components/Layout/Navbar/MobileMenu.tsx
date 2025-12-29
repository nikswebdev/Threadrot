// src/components/Layout/Navbar/MobileMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import SocialIcons from "./SocialIcons";
import "./MobileMenu.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`mobile-menu-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Sliding menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {/* Close button */}
        <button
          className="mobile-menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Menu header */}
        <div className="mobile-menu-header">
          <h2>MENU</h2>
        </div>

        {/* Navigation links */}
        <nav className="mobile-menu-nav">
          <Link to="/" className="mobile-menu-link" onClick={onClose}>
            HOME
          </Link>
          <Link to="/archive" className="mobile-menu-link" onClick={onClose}>
            ARCHIVE
          </Link>
          <Link
            to="/new-arrivals"
            className="mobile-menu-link"
            onClick={onClose}
          >
            NEW ARRIVALS
          </Link>

          {/* Clothing submenu */}
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">CLOTHING</div>
            <Link
              to="/clothing/t-shirts"
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              Classic Tees
            </Link>
            <Link
              to="/clothing/oversized-tees"
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              Oversized Tees
            </Link>
            <Link
              to="/clothing/hoodies"
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              Hoodies
            </Link>
          </div>

          {/* Custom submenu */}
          <div className="mobile-menu-section">
            <div className="mobile-menu-section-title">CUSTOM</div>
            <Link
              to="/custom/create"
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              Create
            </Link>
            <Link
              to="/custom/submit"
              className="mobile-menu-sublink"
              onClick={onClose}
            >
              Submit Design
            </Link>
          </div>

          <Link to="/collabs" className="mobile-menu-link" onClick={onClose}>
            COLLABS
          </Link>
          <Link to="/essentials" className="mobile-menu-link" onClick={onClose}>
            ESSENTIALS
          </Link>
          <Link
            to="/accessories"
            className="mobile-menu-link"
            onClick={onClose}
          >
            ACCESSORIES
          </Link>
          <Link to="/about" className="mobile-menu-link" onClick={onClose}>
            ABOUT
          </Link>
        </nav>

        {/* Social icons at bottom */}
        <div className="mobile-menu-footer">
          <SocialIcons />
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
