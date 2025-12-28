import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <Link
        to="/"
        className={location.pathname === "/" ? "nav-link active" : "nav-link"}
      >
        HOME
      </Link>
      <Link
        to="/archive"
        className={
          location.pathname === "/archive" ? "nav-link active" : "nav-link"
        }
      >
        ARCHIVE
      </Link>
      <Link
        to="/about"
        className={
          location.pathname === "/about" ? "nav-link active" : "nav-link"
        }
      >
        ABOUT
      </Link>
    </nav>
  );
};

export default Navigation;
export {};
