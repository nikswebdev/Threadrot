// src/components/Cart/CartSidebar.tsx - SHOPPING CART
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  closeCart,
  applyDiscount,
  removeDiscount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from "../../store/slices/cartSlice";
import { X, Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import "./CartSidebar.css";

const CartSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const appliedDiscount = useAppSelector((state) => state.cart.appliedDiscount);

  const [discountCode, setDiscountCode] = useState("");
  const [discountError, setDiscountError] = useState("");

  const FREE_SHIPPING_THRESHOLD = 75;
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const hasDiscount = appliedDiscount !== null;

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();

    // Mock discount codes (replace with actual API call)
    const validCodes: { [key: string]: number } = {
      THREADROT10: 10,
      SAVE15: 15,
      WELCOME20: 20,
    };

    if (validCodes[code]) {
      dispatch(applyDiscount({ code, percentage: validCodes[code] }));
      setDiscountCode("");
      setDiscountError("");
    } else {
      setDiscountError("Invalid discount code");
    }
  };

  const handleRemoveDiscount = () => {
    dispatch(removeDiscount());
  };

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  const handleClose = () => {
    dispatch(closeCart());
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={handleClose} />

      {/* Cart Sidebar */}
      <div className="cart-sidebar">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={24} />
            <h2>YOUR CART ({items.length})</h2>
          </div>
          <button className="cart-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-content">
          {items.length === 0 ? (
            // Empty Cart
            <div className="cart-empty">
              <ShoppingBag size={64} />
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button className="continue-shopping-btn" onClick={handleClose}>
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Progress */}
              {remainingForFreeShipping > 0 && (
                <div className="free-shipping-banner">
                  <p>
                    Add <strong>${remainingForFreeShipping.toFixed(2)}</strong>{" "}
                    more for <strong>FREE SHIPPING!</strong>
                  </p>
                  <div className="shipping-progress-bar">
                    <div
                      className="shipping-progress-fill"
                      style={{
                        width: `${Math.min(
                          100,
                          (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {remainingForFreeShipping === 0 && (
                <div className="free-shipping-banner achieved">
                  <p>
                    🎉 You've earned <strong>FREE SHIPPING!</strong>
                  </p>
                </div>
              )}

              {/* Cart Items */}
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p className="cart-item-meta">
                          Size: {item.size} • ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="cart-item-actions">
                        {/* Quantity Controls */}
                        <div className="cart-quantity-control">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 10}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="cart-item-remove"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart */}
              {items.length > 0 && (
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Clear Cart
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer (only show if items exist) */}
        {items.length > 0 && (
          <div className="cart-footer">
            {/* Discount Code */}
            <div className="discount-section">
              {hasDiscount ? (
                <div className="discount-applied">
                  <div className="discount-applied-info">
                    <Tag size={16} />
                    <span>
                      {appliedDiscount.code} ({appliedDiscount.percentage}% off)
                    </span>
                  </div>
                  <button onClick={handleRemoveDiscount}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="discount-input-group">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase());
                      setDiscountError("");
                    }}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleApplyDiscount()
                    }
                  />
                  <button onClick={handleApplyDiscount}>APPLY</button>
                </div>
              )}
              {discountError && (
                <p className="discount-error">{discountError}</p>
              )}
            </div>

            {/* Totals */}
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {hasDiscount && (
                <div className="cart-total-row discount">
                  <span>Discount ({appliedDiscount.percentage}%)</span>
                  <span>-${(subtotal - total).toFixed(2)}</span>
                </div>
              )}

              <div className="cart-total-row">
                <span>Shipping</span>
                <span>
                  {remainingForFreeShipping === 0
                    ? "FREE"
                    : "Calculated at checkout"}
                </span>
              </div>

              <div className="cart-total-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>

            <button className="continue-shopping-link" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );
};

export default CartSidebar;
