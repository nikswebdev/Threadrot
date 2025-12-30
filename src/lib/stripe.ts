// src/lib/stripe.ts - STRIPE CLIENT SETUP

import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error("❌ STRIPE ERROR: Publishable key not configured!");
  console.error("Add to .env.local:");
  console.error("REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...");
}

// Initialize Stripe
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

console.log("🔍 Stripe Configuration:");
console.log(
  "Key:",
  stripePublishableKey
    ? `✅ ${stripePublishableKey.substring(0, 20)}...`
    : "❌ MISSING"
);
