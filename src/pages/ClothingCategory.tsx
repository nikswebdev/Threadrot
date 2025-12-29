// src/pages/ClothingCategory.tsx - FIXED
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { filterProducts } from "../store/slices/productsSlice";
import ProductGridContainer from "../components/Products/ProductGridContainer";

const ClothingCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category) {
      dispatch(filterProducts(category));
    }
  }, [category, dispatch]);

  // Format category name for display
  const formatCategoryName = (cat: string) => {
    return cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryName = category ? formatCategoryName(category) : "Category";
  const description = `Explore our collection of ${categoryName.toLowerCase()} designs`;

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{categoryName}</h1>
        <p className="category-description">{description}</p>
      </div>
      <ProductGridContainer />
    </div>
  );
};

export default ClothingCategory;
