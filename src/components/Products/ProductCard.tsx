import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Archive } from "lucide-react";
import { Product } from "../../types";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="archive-card">
      <div className="card-header">
        <span>ID: {product.id.toString().padStart(4, "0")}</span>
        <span>ERA: {product.era}</span>
      </div>

      <div className="card-image-placeholder">
        <Archive size={48} color="#333" />
      </div>

      <h2 className="card-title">{product.name}</h2>
      <div className="card-meta">
        <span className="card-price">{product.price}</span>
        <span className="card-separator">|</span>
        <span
          className={`card-rot ${product.rot === "100%" ? "high-rot" : ""}`}
        >
          ROT_LEVEL: {product.rot}
        </span>
      </div>

      <Link to={`/product/${product.id}`} className="buy-button">
        VIEW DETAILS <ArrowUpRight size={16} className="button-icon" />
      </Link>
    </div>
  );
};

export default ProductCard;
export {};
