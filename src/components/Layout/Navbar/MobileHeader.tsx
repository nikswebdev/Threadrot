// src/components/Layout/Navbar/MobileHeader.tsx
import React from "react";
import { Menu } from "lucide-react"; // Hamburger icon
import NavbarLogo from "./NavbarLogo";
import SocialIcons from "./SocialIcons";
import ShoppingCartIcon from "./ShoppingCartIcon";
import "./MobileHeader.css"; // New CSS file for mobile header

interface MobileHeaderProps {
  // Add a prop to handle opening/closing a potential mobile menu
  onHamburgerClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onHamburgerClick }) => {
  return (
    <div className="mobile-header">
      <div className="mobile-header-left">
        <button
          className="hamburger-menu"
          onClick={onHamburgerClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="mobile-header-center">
        <NavbarLogo /> {/* Reusing the logo component */}
      </div>
      <div className="mobile-header-right">
        <SocialIcons /> {/* Reusing social icons */}
        <ShoppingCartIcon /> {/* Reusing shopping cart */}
      </div>
    </div>
  );
};

export default MobileHeader;
