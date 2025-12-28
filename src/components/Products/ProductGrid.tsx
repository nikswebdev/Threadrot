import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <h3>No products found in this category</h3>
        <Link to="/" className="back-to-all">
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
export {};
