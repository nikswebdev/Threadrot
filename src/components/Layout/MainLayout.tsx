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
import MobileHeader from "./Navbar/MobileHeader";
import FilterSortBar from "../Products/FilterSortBar";

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

  const handleHamburgerClick = () => {
    console.log("Menu clicked");
  };

  return (
    <div className="main-app-container">
      <TopMarquee />

      <div className="main-content-wrapper">
        <MemeBackground screenWidth={screenWidth} />

        {/* 1. Navbar */}
        {isMobile ? (
          <MobileHeader onHamburgerClick={handleHamburgerClick} />
        ) : (
          <MainNavbar />
        )}

        {/* 2. Hero Section (Full Width) */}
        {isHomePage && <HeroSection />}

        {/* 3. Filter/Sort Bar (Full Width) - NEW LOCATION */}
        {isHomePage && (
          <FilterSortBar
            onFilterClick={() => console.log("Filter")}
            onSortClick={() => console.log("Sort")}
          />
        )}

        {/* 4. The Split Layout (Sidebar + Content) */}
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
