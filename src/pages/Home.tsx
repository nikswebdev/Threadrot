// src/pages/Home.tsx
import React from "react";
import ProductGrid from "../components/Products/ProductGrid";
import "./Home.css";

const Home: React.FC = () => {
  // ProductGrid now gets products from Redux directly, no props needed
  return (
    <div className="home-page-wrapper">
      <div className="product-grid-container">
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
