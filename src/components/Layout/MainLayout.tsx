// src/components/Layout/MainLayout.tsx - CONDITIONAL SIDEBAR
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

  // Hide sidebar on product detail pages
  const isProductPage = location.pathname.startsWith("/product/");

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

        {/* Hero Section (Full Width - Home Page Only) */}
        {isHomePage && <HeroSection />}

        {/* The Split Layout (Sidebar + Content) OR Full Width */}
        <div className="content-split-layout">
          {/* Show sidebar on non-product pages */}
          {!isProductPage && (
            <aside className="layout-sidebar">
              <Sidebar />
            </aside>
          )}

          {/* Main content - full width on product pages, normal on others */}
          <main
            className={
              isProductPage
                ? "layout-full-width-content"
                : "layout-main-content"
            }
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
