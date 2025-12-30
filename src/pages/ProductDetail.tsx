// src/pages/ProductDetail.tsx - COMPLETE PRODUCT PAGE
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedProduct } from "../store/slices/productsSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Product } from "../types";
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Mock data for images (would come from product data)
  const productImages = selectedProduct
    ? [
        selectedProduct.image,
        selectedProduct.hoverImage || selectedProduct.image,
        selectedProduct.image, // Mock additional images
      ].filter(Boolean)
    : [];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Mock related products (would be filtered from actual products)
  const relatedProducts = products.slice(0, 4);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p: Product) => p.id === id);
      dispatch(setSelectedProduct(foundProduct));
      window.scrollTo(0, 0);
    }
  }, [id, products, dispatch]);

  if (!selectedProduct) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // Add to cart
    dispatch(
      addToCart({
        id: "", // Will be generated in cartSlice
        productId: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        size: selectedSize,
        quantity: quantity,
        category: selectedProduct.category,
      })
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Add to wishlist logic
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProduct.name,
          text: `Check out ${selectedProduct.name} on Threadrot!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => navigate("/")} className="breadcrumb-link">
          Home
        </button>
        <span className="breadcrumb-separator">/</span>
        <button onClick={() => navigate(-1)} className="breadcrumb-link">
          {selectedProduct.category}
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{selectedProduct.name}</span>
      </div>

      {/* Main Content */}
      <div className="product-detail-content">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          {/* Main Image */}
          <div className="product-main-image-container">
            <img
              src={productImages[currentImageIndex]}
              alt={selectedProduct.name}
              className={`product-main-image ${isZoomed ? "zoomed" : ""}`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Image Navigation */}
            {productImages.length > 1 && (
              <>
                <button className="image-nav-btn prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="image-nav-btn next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Zoom Indicator */}
            <div className="zoom-indicator">
              <ZoomIn size={16} />
              <span>Click to {isZoomed ? "zoom out" : "zoom in"}</span>
            </div>

            {/* Badges */}
            <div className="product-detail-badges">
              {selectedProduct.isNew && (
                <span className="badge badge-new">NEW</span>
              )}
              {selectedProduct.isTrending && (
                <span className="badge badge-trending">🔥 TRENDING</span>
              )}
              {selectedProduct.isLowStock && selectedProduct.stockCount && (
                <span className="badge badge-low-stock">
                  ONLY {selectedProduct.stockCount} LEFT
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {productImages.length > 1 && (
            <div className="product-thumbnails">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="product-info">
          {/* Category */}
          <div className="product-category">{selectedProduct.category}</div>

          {/* Title */}
          <h1 className="product-title">{selectedProduct.name}</h1>

          {/* Price */}
          <div className="product-price-section">
            <span className="product-price">
              ${selectedProduct.price.toFixed(2)}
            </span>
            {selectedProduct.inStock ? (
              <span className="stock-status in-stock">In Stock</span>
            ) : (
              <span className="stock-status out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <p className="product-description">
            {selectedProduct.description ||
              "Limited edition streetwear from the internet's digital archive. Premium quality, maximum rot."}
          </p>

          {/* Size Selector */}
          <div className="product-options-section">
            <label className="option-label">Select Size</label>
            <div className="size-selector">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="size-guide-link">Size Guide</button>
          </div>

          {/* Quantity Selector */}
          <div className="product-options-section">
            <label className="option-label">Quantity</label>
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="product-actions">
            <button
              className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}
              onClick={handleAddToCart}
              disabled={!selectedProduct.inStock}
            >
              <ShoppingCart size={20} />
              <span>{addedToCart ? "ADDED TO CART!" : "ADD TO CART"}</span>
            </button>

            <button
              className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
              onClick={handleFavorite}
            >
              <Heart size={20} fill={isFavorited ? "#00ff41" : "none"} />
            </button>

            <button className="share-btn" onClick={handleShare}>
              <Share2 size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="feature-item">
              <Truck size={20} />
              <div className="feature-text">
                <strong>Free Shipping</strong>
                <span>On orders over $75</span>
              </div>
            </div>
            <div className="feature-item">
              <RotateCcw size={20} />
              <div className="feature-text">
                <strong>Easy Returns</strong>
                <span>30-day return policy</span>
              </div>
            </div>
            <div className="feature-item">
              <Shield size={20} />
              <div className="feature-text">
                <strong>Secure Payment</strong>
                <span>SSL encrypted checkout</span>
              </div>
            </div>
          </div>

          {/* Details Accordion */}
          <div className="product-details-section">
            <details className="detail-accordion" open>
              <summary>Product Details</summary>
              <div className="detail-content">
                <ul>
                  <li>100% premium cotton</li>
                  <li>Screen-printed graphics</li>
                  <li>Pre-shrunk fabric</li>
                  <li>Unisex fit</li>
                  <li>Made with maximum rot</li>
                </ul>
              </div>
            </details>

            <details className="detail-accordion">
              <summary>Shipping & Returns</summary>
              <div className="detail-content">
                <p>
                  <strong>Shipping:</strong> Free shipping on orders over $75.
                  Standard delivery 5-7 business days.
                </p>
                <p>
                  <strong>Returns:</strong> 30-day return policy. Items must be
                  unworn with tags attached.
                </p>
              </div>
            </details>

            <details className="detail-accordion">
              <summary>Care Instructions</summary>
              <div className="detail-content">
                <ul>
                  <li>Machine wash cold</li>
                  <li>Tumble dry low</li>
                  <li>Do not bleach</li>
                  <li>Iron inside out if needed</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products-section">
        <h2 className="related-products-title">YOU MIGHT ALSO LIKE</h2>
        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <button
              key={product.id}
              className="related-product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />
              <div className="related-product-info">
                <h3>{product.name}</h3>
                <span className="related-product-price">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
