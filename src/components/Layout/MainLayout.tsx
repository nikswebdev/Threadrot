// src/components/Layout/MainLayout.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useScreenSize } from "../../hooks/useScreenSize";
import TopMarquee from "./Header/TopMarquee";
import Sidebar from "./Sidebar/Sidebar";
import MemeBackground from "../Background/MemeBackground";
import HeroSection from "../Hero/HeroSection";
import MainNavbar from "./Navbar/MainNavbar";
import MobileHeader from "./Navbar/MobileHeader";
import FilterSortBar from "../Products/FilterSortBar";
import MobileMenu from "./Navbar/MobileMenu";

import "./Layout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useScreenSize();
  const screenWidth = useAppSelector((state) => state.ui.screenWidth);
  const location = useLocation();
  const isMobile = screenWidth <= 768;
  const isHomePage = location.pathname === "/";

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="main-app-container">
      <TopMarquee />

      <div className="main-content-wrapper">
        <MemeBackground screenWidth={screenWidth} />

        {/* Navbar */}
        {isMobile ? (
          <MobileHeader onHamburgerClick={handleHamburgerClick} />
        ) : (
          <MainNavbar />
        )}

        {/* Mobile Menu Overlay */}
        {isMobile && (
          <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        )}

        {/* Hero Section (Full Width) */}
        {isHomePage && <HeroSection />}

        {/* Filter/Sort Bar (Full Width) */}
        {isHomePage && <FilterSortBar />}

        {/* The Split Layout (Sidebar + Content) */}
        <div className="content-split-layout">
          <aside className="layout-sidebar">
            <Sidebar />
          </aside>

          <main className="layout-main-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
