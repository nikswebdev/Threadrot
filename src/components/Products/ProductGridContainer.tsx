// src/components/Products/ProductGridContainer.tsx - COMPLETE WITH ALL LOGGING
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import ProductGrid from "./ProductGrid";
import FilterSortBar from "./FilterSortBar";

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

  // Local state for grid view
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");

  const handleGridViewChange = (view: "grid" | "compact") => {
    console.log("🔵 handleGridViewChange called with:", view);
    setGridView(view);
  };

  // Log whenever gridView changes
  useEffect(() => {
    console.log("🟢 gridView state is now:", gridView);
  }, [gridView]);

  console.log("🟡 ProductGridContainer rendering with gridView:", gridView);

  return (
    <>
      {/* Filter/Sort Bar with Grid View Controls */}
      <FilterSortBar
        gridView={gridView}
        onGridViewChange={handleGridViewChange}
      />

      {/* Product Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        onClearFilters={onClearFilters}
        gridView={gridView}
      />
    </>
  );
};

export default ProductGridContainer;
