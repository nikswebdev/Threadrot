// src/components/Products/ProductGridContainer.tsx
// This wrapper connects ProductGrid to Redux and handles the products prop

import React from "react";
import { useAppSelector } from "../../hooks";
import ProductGrid from "./ProductGrid";

interface ProductGridContainerProps {
  loading?: boolean;
  onClearFilters?: () => void;
}

const ProductGridContainer: React.FC<ProductGridContainerProps> = ({
  loading,
  onClearFilters,
}) => {
  // Get products from Redux store
  const products = useAppSelector((state) => state.products.filteredItems);

  return (
    <ProductGrid
      products={products}
      loading={loading}
      onClearFilters={onClearFilters}
    />
  );
};

export default ProductGridContainer;
