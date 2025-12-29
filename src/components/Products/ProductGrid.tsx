// src/components/Products/ProductGrid.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import "./ProductGrid.css";

const ProductGrid: React.FC = () => {
  const products = useAppSelector((state) => state.products.filteredItems);
  const gridView = useAppSelector((state) => state.ui.gridView);
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  if (isLoading) {
    return (
      <section className={`product-grid ${gridView}`}>
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found</h3>
        <p>Try adjusting your filters or browse all products</p>
        <Link to="/" className="back-to-all">
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <section className={`product-grid ${gridView}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
