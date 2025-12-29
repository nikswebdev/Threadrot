// src/components/Products/ProductCardSkeleton.tsx
import React from "react";
import "./ProductCardSkeleton.css";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-info">
        <div className="skeleton-category"></div>
        <div className="skeleton-name"></div>
        <div className="skeleton-name-short"></div>
        <div className="skeleton-price"></div>
      </div>
    </div>
  );
};

// Named export for grid of skeletons
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
};

// Default export
export default ProductCardSkeleton;
