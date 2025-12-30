// src/pages/Checkout.tsx - COMPLETE CHECKOUT WITH STRIPE
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "../lib/stripe";
import { useAppSelector, useAppDispatch } from "../hooks";
import { clearCart } from "../store/slices/cartSlice";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
} from "../store/slices/cartSlice";
import { orderService } from "../services/orderService";
import StripeCheckout from "../components/Payment/StripeCheckout";
import { Lock, Truck, CreditCard, ShieldCheck } from "lucide-react";
import "./Checkout.css";

interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const appliedDiscount = useAppSelector((state) => state.cart.appliedDiscount);

  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">(
    "shipping"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const FREE_SHIPPING_THRESHOLD = 75;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8.99;
  const tax = total * 0.08; // 8% tax (adjust for your location)
  const grandTotal = total + shippingCost + tax;

  const stripePromise = getStripe();

  // Redirect if cart is empty (but not if we're navigating to confirmation)
  const [isNavigatingToConfirmation, setIsNavigatingToConfirmation] =
    useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !isNavigatingToConfirmation) {
      navigate("/");
    }
  }, [cartItems, navigate, isNavigatingToConfirmation]);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateShipping = (): boolean => {
    if (!shippingInfo.email || !shippingInfo.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!shippingInfo.firstName || !shippingInfo.lastName) {
      setError("Please enter your full name");
      return false;
    }
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode
    ) {
      setError("Please complete your shipping address");
      return false;
    }
    if (!shippingInfo.phone) {
      setError("Please enter your phone number");
      return false;
    }
    setError("");
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setCurrentStep("payment");
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    console.log("💳 Payment successful!", paymentIntentId);
    setIsProcessing(true);
    setError("");

    try {
      console.log("📦 Creating order in Supabase...");

      // Create order in Supabase
      const order = await orderService.createOrder({
        email: shippingInfo.email,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        apartment: shippingInfo.apartment,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        phone: shippingInfo.phone,
        subtotal,
        discountCode: appliedDiscount?.code,
        discountAmount: appliedDiscount ? subtotal - total : 0,
        shippingCost,
        tax,
        total: grandTotal,
        items: cartItems,
      });

      console.log("✅ Order created:", order.id);

      // Set flag BEFORE clearing cart to prevent redirect
      setIsNavigatingToConfirmation(true);

      // Clear cart
      dispatch(clearCart());

      console.log("🎉 Navigating to confirmation...");
      // Navigate to confirmation
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error("❌ Order creation error:", err);
      setError(
        "Payment successful but failed to create order. Please contact support with your payment confirmation."
      );
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setIsProcessing(false);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Left Column - Forms */}
        <div className="checkout-main">
          {/* Header */}
          <div className="checkout-header">
            <h1>CHECKOUT</h1>
            <div className="checkout-steps">
              <div
                className={`step ${
                  currentStep === "shipping" ? "active" : "complete"
                }`}
              >
                <span className="step-number">1</span>
                <span className="step-label">Shipping</span>
              </div>
              <div className="step-divider"></div>
              <div
                className={`step ${currentStep === "payment" ? "active" : ""}`}
              >
                <span className="step-number">2</span>
                <span className="step-label">Payment</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="checkout-error">
              <ShieldCheck size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Shipping Form */}
          {currentStep === "shipping" && (
            <div className="checkout-section">
              <h2>
                <Truck size={20} />
                Shipping Information
              </h2>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Apartment, suite, etc. (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={shippingInfo.apartment}
                  onChange={handleShippingChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    placeholder="CA"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  placeholder="(555) 555-5555"
                  required
                />
              </div>

              <button
                className="continue-btn"
                onClick={handleContinueToPayment}
              >
                CONTINUE TO PAYMENT
              </button>
            </div>
          )}

          {/* Payment Form */}
          {currentStep === "payment" && (
            <div className="checkout-section">
              <div className="section-header-with-edit">
                <h2>
                  <CreditCard size={20} />
                  Payment Information
                </h2>
                <button
                  className="edit-btn"
                  onClick={() => setCurrentStep("shipping")}
                >
                  Edit Shipping
                </button>
              </div>

              {/* Shipping Summary */}
              <div className="shipping-summary">
                <p className="summary-label">Shipping to:</p>
                <p className="summary-value">
                  {shippingInfo.firstName} {shippingInfo.lastName}
                  <br />
                  {shippingInfo.address}
                  {shippingInfo.apartment && `, ${shippingInfo.apartment}`}
                  <br />
                  {shippingInfo.city}, {shippingInfo.state}{" "}
                  {shippingInfo.zipCode}
                </p>
              </div>

              {/* Stripe Checkout */}
              <Elements stripe={stripePromise}>
                <StripeCheckout
                  amount={grandTotal}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  disabled={isProcessing}
                />
              </Elements>
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-sidebar">
          <div className="order-summary">
            <h3>ORDER SUMMARY</h3>

            {/* Items */}
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="summary-item-details">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-meta">
                      Size: {item.size} • Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {appliedDiscount && (
                <div className="summary-row discount">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span>-${(subtotal - total).toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <Lock size={20} />
              <span>Secure Checkout</span>
            </div>
            <div className="trust-badge">
              <Truck size={20} />
              <span>Free Shipping Over $75</span>
            </div>
            <div className="trust-badge">
              <ShieldCheck size={20} />
              <span>Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
