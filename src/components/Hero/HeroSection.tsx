// src/components/Hero/HeroSection.tsx
import React from "react";
import FixedNavButtons from "./FixedNavButtons";
import "./HeroSection.css";

const HeroSection: React.FC = () => (
  <section className="hero-section">
    <div className="hero-content">
      <h1 className="hero-title">
        <span className="hero-line">TERMINALLY ONLINE.</span>
        {/* REMOVED: data-text="FASHION" attribute */}
        <span className="hero-line">
          MAKE IT <span className="fashion-word">FASHION</span>
        </span>
      </h1>
      <FixedNavButtons />
    </div>
  </section>
);

export default HeroSection;
