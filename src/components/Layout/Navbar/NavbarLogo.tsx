// src/components/Layout/Navbar/NavbarLogo.tsx
import React from "react";
import ArchiveLogo from "../../UI/ArchiveLogo";
import { Link } from "react-router-dom";
import "./MainNavbar.css";

const NavbarLogo: React.FC = () => (
  <Link to="/" className="navbar-logo-link">
    <ArchiveLogo width={200} /> {/* Changed from 160 to 200 for consistency */}
  </Link>
);

export default NavbarLogo;
