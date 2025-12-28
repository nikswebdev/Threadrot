// src/components/Layout/Navbar/MainNavbar.tsx
import React from "react";
import NavbarLogo from "./NavbarLogo";
import NavLinkWithDropdown from "./NavLinkWithDropdown";
import SocialIcons from "./SocialIcons";
import ShoppingCartIcon from "./ShoppingCartIcon";
import "./MainNavbar.css";

const MainNavbar: React.FC = () => {
  return (
    <nav className="main-navbar">
      <div className="navbar-section left">
        <NavbarLogo />
      </div>

      <div className="navbar-section center">
        <NavLinkWithDropdown label="New Arrivals" link="/new-arrivals" />
        <NavLinkWithDropdown
          label="Clothing"
          dropdownItems={[
            { label: "T-Shirts", to: "/clothing/t-shirts" },
            { label: "Hoodies", to: "/clothing/hoodies" },
            { label: "Long Sleeves", to: "/clothing/long-sleeves" },
          ]}
        />
        <NavLinkWithDropdown
          label="Custom"
          dropdownItems={[
            { label: "Create Your Own", to: "/custom/create" },
            { label: "Submit Design", to: "/custom/submit" },
          ]}
        />
        <NavLinkWithDropdown label="Collabs" link="/collabs" />
        <NavLinkWithDropdown
          label="Plain Tees & Essentials"
          link="/essentials"
        />
        <NavLinkWithDropdown label="Accessories" link="/accessories" />
      </div>

      <div className="navbar-section right">
        <SocialIcons />
        <ShoppingCartIcon />
      </div>
    </nav>
  );
};

export default MainNavbar;
