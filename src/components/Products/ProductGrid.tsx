// src/components/Products/ProductGrid.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import EmptyState from "../UI/EmptyState";
import "./ProductGrid.css";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onClearFilters?: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onClearFilters,
}) => {
  // Show loading skeletons
  if (loading) {
    return (
      <section className="product-grid">
        <ProductGridSkeleton count={8} />
      </section>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return <EmptyState type="no-results" onClearFilters={onClearFilters} />;
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          hoverImage={product.hoverImage} // Add this to Product type if not present
          category={product.category}
          isNew={product.isNew} // Add this to Product type if not present
          isLowStock={product.isLowStock} // Add this to Product type if not present
          isTrending={product.isTrending} // Add this to Product type if not present
          stockCount={product.stockCount} // Add this to Product type if not present
          inStock={product.inStock} // Add this to Product type if not present
        />
      ))}
    </section>
  );
};

export default ProductGrid;
