// src/components/Products/ProductCardSkeleton.tsx
import React from "react";
import "./ProductCard.css";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="archive-card skeleton">
      <div className="card-header skeleton-header">
        <span className="skeleton-text skeleton-short"></span>
        <span className="skeleton-text skeleton-short"></span>
      </div>

      <div className="card-image-placeholder skeleton-image"></div>

      <div className="skeleton-text skeleton-title"></div>
      <div className="card-meta">
        <span className="skeleton-text skeleton-short"></span>
        <span className="card-separator">|</span>
        <span className="skeleton-text skeleton-short"></span>
      </div>

      <div className="buy-button skeleton-button"></div>
    </div>
  );
};

export default ProductCardSkeleton;
