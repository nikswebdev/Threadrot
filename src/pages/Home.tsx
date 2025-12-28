import React from "react";
// Remove HeroSection import
import ProductGrid from "../components/Products/ProductGrid";
import { useAppSelector } from "../hooks";

const Home: React.FC = () => {
  const filteredProducts = useAppSelector(
    (state) => state.products.filteredItems
  );

  return (
    // We removed HeroSection from here to let MainLayout handle the positioning
    <ProductGrid products={filteredProducts} />
  );
};

export default Home;
