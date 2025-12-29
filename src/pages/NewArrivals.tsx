// src/pages/NewArrivals.tsx - FIXED
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { setSortBy } from "../store/slices/productsSlice";
import ProductGridContainer from "../components/Products/ProductGridContainer";
import "./CategoryPage.css";

const NewArrivals: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Sort by newest when component mounts
    dispatch(setSortBy("Newest Arrivals"));
  }, [dispatch]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>NEW ARRIVALS</h1>
        <p className="category-description">
          Fresh drops from the archive. Limited quantities available.
        </p>
      </div>
      <ProductGridContainer />
    </div>
  );
};

export default NewArrivals;
