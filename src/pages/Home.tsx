// src/pages/Home.tsx
import React from "react";
import ProductGrid from "../components/Products/ProductGrid";
import { useAppSelector } from "../hooks";
import "./Home.css";

const Home: React.FC = () => {
  const filteredProducts = useAppSelector(
    (state) => state.products.filteredItems
  );

  return (
    <div className="home-page-wrapper">
      <div className="product-grid-container">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;
