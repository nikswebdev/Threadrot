// src/components/Products/ProductGrid.tsx - WITH GRID VIEW
import React from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";
import EmptyState from "../UI/EmptyState";
import "./ProductGrid.css";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onClearFilters?: () => void;
  gridView?: "grid" | "compact";
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onClearFilters,
  gridView = "grid",
}) => {
  // Show loading skeletons
  if (loading) {
    return (
      <section className={`product-grid ${gridView}`}>
        <ProductGridSkeleton count={8} />
      </section>
    );
  }

  // Show empty state if no products
  if (products.length === 0) {
    return <EmptyState type="no-results" onClearFilters={onClearFilters} />;
  }

  return (
    <section className={`product-grid ${gridView}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          hoverImage={product.hoverImage}
          category={product.category}
          isNew={product.isNew}
          isLowStock={product.isLowStock}
          isTrending={product.isTrending}
          stockCount={product.stockCount}
          inStock={product.inStock}
        />
      ))}
    </section>
  );
};

export default ProductGrid;
