// src/components/Layout/Navbar/NavbarLogo.tsx
import React from "react";
import ArchiveLogo from "../../UI/ArchiveLogo";
import { Link } from "react-router-dom";
import "./MainNavbar.css"; // For potential logo specific styles

const NavbarLogo: React.FC = () => (
  <Link to="/" className="navbar-logo-link">
    <ArchiveLogo width={160} /> {/* Adjust width for Navbar */}
  </Link>
);

export default NavbarLogo;
