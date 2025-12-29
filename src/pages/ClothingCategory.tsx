// src/pages/ClothingCategory.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { setFilter } from "../store/slices/productsSlice";
import ProductGrid from "../components/Products/ProductGrid";
import "./CategoryPage.css";

const categoryTitles: { [key: string]: string } = {
  "t-shirts": "CLASSIC TEES",
  "oversized-tees": "OVERSIZED TEES",
  hoodies: "HOODIES",
  "long-sleeves": "LONG SLEEVES",
};

const categoryDescriptions: { [key: string]: string } = {
  "t-shirts": "Classic fit. Timeless memes. Perfect for everyday wear.",
  "oversized-tees": "Oversized comfort. Maximum meme impact. Streetwear vibes.",
  hoodies: "Cozy comfort. Hood up, world out. Peak meme energy.",
  "long-sleeves": "Extended coverage. Long-lasting memes. All-season style.",
};

const ClothingCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear filters when entering category
    dispatch(setFilter({ filterType: "category", value: "ALL" }));

    // You could add clothing type filtering here if you extend the Product type
    // For now, it shows all products
  }, [category, dispatch]);

  const title = categoryTitles[category || ""] || "CLOTHING";
  const description =
    categoryDescriptions[category || ""] || "Browse our collection";

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">{title}</h1>
        <p className="category-description">{description}</p>
      </div>
      <ProductGrid />
    </div>
  );
};

export default ClothingCategory;
