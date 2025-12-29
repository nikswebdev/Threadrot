// src/components/Products/ProductCard.tsx
import React, { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string; // Second image for hover effect
  category: string;
  isNew?: boolean;
  isLowStock?: boolean;
  isTrending?: boolean;
  stockCount?: number;
  inStock?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  hoverImage,
  category,
  isNew = false,
  isLowStock = false,
  isTrending = false,
  stockCount,
  inStock = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    // TODO: Add to wishlist in backend
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Add to cart logic
    console.log(`Added ${name} to cart`);
  };

  return (
    <article
      className={`product-card ${!inStock ? "product-card-out-of-stock" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="product-card-link">
        {/* Image Container */}
        <div className="product-card-image-wrapper">
          {/* Badges */}
          <div className="product-card-badges">
            {!inStock && (
              <span className="product-badge product-badge-out-of-stock">
                OUT OF STOCK
              </span>
            )}
            {inStock && isNew && (
              <span className="product-badge product-badge-new">NEW</span>
            )}
            {inStock && isTrending && (
              <span className="product-badge product-badge-trending">
                🔥 TRENDING
              </span>
            )}
            {inStock && isLowStock && stockCount && (
              <span className="product-badge product-badge-low-stock">
                ONLY {stockCount} LEFT
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            className={`product-card-favorite ${
              isFavorited ? "favorited" : ""
            }`}
            onClick={handleFavoriteClick}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart size={20} fill={isFavorited ? "#00ff41" : "none"} />
          </button>

          {/* Product Image */}
          <div className="product-card-image-container">
            <img
              src={image}
              alt={name}
              className={`product-card-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            {hoverImage && (
              <img
                src={hoverImage}
                alt={`${name} - alternate view`}
                className={`product-card-image-hover ${
                  isHovered ? "visible" : ""
                }`}
                loading="lazy"
              />
            )}

            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="product-card-image-skeleton"></div>
            )}
          </div>

          {/* Quick Actions (shown on hover) */}
          <div
            className={`product-card-quick-actions ${
              isHovered ? "visible" : ""
            }`}
          >
            {inStock && (
              <button
                className="quick-action-btn quick-add-btn"
                onClick={handleQuickAdd}
                aria-label="Quick add to cart"
              >
                <ShoppingCart size={18} />
                <span>QUICK ADD</span>
              </button>
            )}
            <button
              className="quick-action-btn quick-view-btn"
              aria-label="Quick view"
            >
              <Eye size={18} />
              <span>QUICK VIEW</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-card-info">
          <div className="product-card-category">{category}</div>
          <h3 className="product-card-name">{name}</h3>
          <div className="product-card-price-row">
            <span className="product-card-price">${price.toFixed(2)}</span>
            {!inStock && <button className="notify-me-btn">NOTIFY ME</button>}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
