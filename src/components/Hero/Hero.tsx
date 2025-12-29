// src/components/Hero/Hero.tsx
import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero: React.FC = () => {
  return (
    <section className="hero-section" aria-label="Hero">
      {/* Background with subtle animation */}
      <div className="hero-background">
        <div className="hero-grid-overlay"></div>
      </div>

      <div className="hero-content">
        {/* Main Headline */}
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-title-main">THREADROT</span>
            <span className="hero-title-sub">ARCHIVE</span>
          </h1>

          <p className="hero-tagline">
            Internet culture.{" "}
            <span className="hero-tagline-highlight">Preserved forever.</span>
          </p>

          <p className="hero-description">
            Limited edition streetwear capturing the ephemeral moments of
            digital history.
            <br />
            From classic memes to MLG nostalgia—wear the internet.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <Link to="/shop" className="hero-cta-primary">
            <span>SHOP NEW DROPS</span>
            <ArrowRight size={20} />
          </Link>

          <Link to="/submit" className="hero-cta-secondary">
            <Zap size={18} />
            <span>SUBMIT DESIGN</span>
          </Link>
        </div>

        {/* Social Proof / Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">500+</span>
            <span className="hero-stat-label">Designs Archived</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">10K+</span>
            <span className="hero-stat-label">Pieces Sold</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">NEW</span>
            <span className="hero-stat-label">Drops Weekly</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;
