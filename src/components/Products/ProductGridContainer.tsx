// src/components/Products/ProductGridContainer.tsx - FIXED
// This is legacy - Home page now uses Supabase directly
// Keeping for compatibility

import React, { useState } from "react";
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
  // Get products from Redux store (legacy - won't have data from Supabase)
  const products = useAppSelector((state) => state.products.filteredItems);

  // Local state for grid view
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");

  return (
    <ProductGrid
      products={products}
      loading={loading}
      onClearFilters={onClearFilters}
      gridView={gridView}
    />
  );
};

export default ProductGridContainer;
