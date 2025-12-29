// src/pages/Home.tsx - FIXED
import React from "react";
import ProductGridContainer from "../components/Products/ProductGridContainer";
import "./Home.css";

const Home: React.FC = () => {
  const handleClearFilters = () => {
    // Clear all filters logic here
    console.log("Clear all filters");
  };

  return (
    <div className="home-page-wrapper">
      <div className="product-grid-container">
        <ProductGridContainer onClearFilters={handleClearFilters} />
      </div>
    </div>
  );
};

export default Home;
