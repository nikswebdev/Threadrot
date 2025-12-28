// src/components/Layout/MainLayout.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useScreenSize } from "../../hooks/useScreenSize";
import TopMarquee from "./Header/TopMarquee";
import Sidebar from "./Sidebar/Sidebar";
import MemeBackground from "../Background/MemeBackground";
import HeroSection from "../Hero/HeroSection";
import MainNavbar from "./Navbar/MainNavbar";
import MobileHeader from "./Navbar/MobileHeader"; // Import MobileHeader
import "./Layout.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useScreenSize();
  const screenWidth = useAppSelector((state) => state.ui.screenWidth);
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMobile = screenWidth <= 768; // Define mobile breakpoint

  // Placeholder for mobile menu state (you'll expand this later)
  const handleHamburgerClick = () => {
    console.log("Hamburger menu clicked!");
    // TODO: Implement logic to open/close a mobile sidebar or full-screen menu
  };

  return (
    <div className="main-app-container">
      <TopMarquee />

      <div className="main-content-wrapper">
        <MemeBackground screenWidth={screenWidth} />

        {/* Conditional Navbar Rendering based on screen size */}
        {isMobile ? (
          <MobileHeader onHamburgerClick={handleHamburgerClick} />
        ) : (
          <MainNavbar />
        )}

        {isHomePage && <HeroSection />}

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
