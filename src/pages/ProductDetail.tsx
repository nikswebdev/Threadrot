// src/pages/ProductDetail.tsx - FETCHES FROM SUPABASE
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAppDispatch } from "../hooks";
import { addToCart } from "../store/slices/cartSlice";
import {
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ArrowLeft,
} from "lucide-react";
import "./ProductDetail.css";

interface SupabaseProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  category: string;
  stock: number;
  is_active: boolean;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<SupabaseProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log("📦 Fetching product:", id);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Error fetching product:", error);
        throw error;
      }

      console.log("✅ Product fetched:", data);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Failed to fetch product:", err);
      setLoading(false);
      // Redirect to home after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!product) return;

    dispatch(
      addToCart({
        id: "", // Will be generated in cartSlice
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: quantity,
        category: product.category,
      })
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = async () => {
    if (!product) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Threadrot!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-loading">
        <p>Product not found</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="product-detail-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="product-detail-container">
        {/* Left: Image */}
        <div className="product-detail-image-section">
          <div className="product-detail-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
            />
            {!inStock && (
              <div className="out-of-stock-overlay">
                <span>OUT OF STOCK</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-detail-info-section">
          <div className="product-detail-header">
            <div>
              <p className="product-detail-category">{product.category}</p>
              <h1 className="product-detail-title">{product.name}</h1>
            </div>
            <button
              className={`favorite-button ${isFavorited ? "favorited" : ""}`}
              onClick={handleFavorite}
            >
              <Heart size={24} fill={isFavorited ? "#00ff41" : "none"} />
            </button>
          </div>

          <div className="product-detail-price">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>

          {product.description && (
            <div className="product-detail-description">
              <p>{product.description}</p>
            </div>
          )}

          {/* Size Selector */}
          {inStock && (
            <div className="product-detail-sizes">
              <label className="size-label">SELECT SIZE</label>
              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {inStock && (
            <div className="product-detail-quantity">
              <label className="quantity-label">QUANTITY</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-detail-actions">
            {inStock ? (
              <>
                <button
                  className={`add-to-cart-btn ${addedToCart ? "added" : ""}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>{addedToCart ? "ADDED TO CART!" : "ADD TO CART"}</span>
                </button>
                <button className="share-btn" onClick={handleShare}>
                  <Share2 size={20} />
                </button>
              </>
            ) : (
              <button className="notify-btn" disabled>
                OUT OF STOCK
              </button>
            )}
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="feature-item">
              <Truck size={20} />
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield size={20} />
              <div>
                <strong>Secure Payment</strong>
                <p>100% protected</p>
              </div>
            </div>
            <div className="feature-item">
              <RotateCcw size={20} />
              <div>
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="product-details-accordion">
            <details open>
              <summary>Product Details</summary>
              <div className="details-content">
                <p>
                  <strong>Material:</strong> Premium Cotton Blend
                </p>
                <p>
                  <strong>Fit:</strong> Regular Fit
                </p>
                <p>
                  <strong>Care:</strong> Machine wash cold, tumble dry low
                </p>
                <p>
                  <strong>Print:</strong> High-quality DTG printing
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
