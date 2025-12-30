// src/components/Payment/StripeCheckout.tsx - STRIPE PAYMENT FORM

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";
import "./StripeCheckout.css";

interface StripeCheckoutProps {
  amount: number; // in dollars
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
  disabled?: boolean;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amount,
  onSuccess,
  onError,
  disabled = false,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#fff",
        fontFamily: '"Space Mono", monospace',
        "::placeholder": {
          color: "#666",
        },
        backgroundColor: "transparent",
      },
      invalid: {
        color: "#ff4444",
        iconColor: "#ff4444",
      },
    },
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!cardholderName.trim()) {
      onError("Please enter cardholder name");
      return;
    }

    setProcessing(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      onError("Card element not found");
      setProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error: pmError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: cardholderName,
          },
        });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // TODO: In production, you'd send this to your backend to create a PaymentIntent
      // For now, we'll simulate success
      console.log("✅ Payment Method Created:", paymentMethod.id);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success!
      onSuccess(paymentMethod.id);
    } catch (err: any) {
      console.error("Payment error:", err);
      onError(err.message || "Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form">
      {/* Cardholder Name */}
      <div className="stripe-form-group">
        <label>Cardholder Name *</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
          className="stripe-input"
          disabled={processing || disabled}
          required
        />
      </div>

      {/* Card Number */}
      <div className="stripe-form-group">
        <label>Card Number *</label>
        <div className="stripe-element-wrapper">
          <CardNumberElement
            options={cardElementOptions}
            className="stripe-element"
          />
        </div>
      </div>

      {/* Expiry and CVC */}
      <div className="stripe-form-row">
        <div className="stripe-form-group">
          <label>Expiry Date *</label>
          <div className="stripe-element-wrapper">
            <CardExpiryElement
              options={cardElementOptions}
              className="stripe-element"
            />
          </div>
        </div>

        <div className="stripe-form-group">
          <label>CVC *</label>
          <div className="stripe-element-wrapper">
            <CardCvcElement
              options={cardElementOptions}
              className="stripe-element"
            />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="stripe-security-notice">
        <Lock size={16} />
        <span>Payments are secure and encrypted</span>
      </div>

      {/* Test Card Info */}
      <div className="stripe-test-info">
        <strong>Test Mode:</strong> Use card 4242 4242 4242 4242
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="stripe-submit-btn"
        disabled={!stripe || processing || disabled}
      >
        {processing ? (
          <>
            <div className="processing-spinner"></div>
            PROCESSING...
          </>
        ) : (
          `PAY $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default StripeCheckout;
