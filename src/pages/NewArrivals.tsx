// src/pages/NewArrivals.tsx
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { setSortBy } from "../store/slices/productsSlice";
import ProductGrid from "../components/Products/ProductGrid";
import "./CategoryPage.css";

const NewArrivals: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Automatically sort by newest when entering this page
    dispatch(setSortBy("Newest Arrivals"));
  }, [dispatch]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">NEW ARRIVALS</h1>
        <p className="category-description">
          Fresh drops. Latest memes. Newest additions to the archive.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
};

export default NewArrivals;
