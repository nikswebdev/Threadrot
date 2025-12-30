// src/lib/supabase.ts - SUPABASE CLIENT WITH DEBUG INFO

import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Debug logging
console.log("🔍 Supabase Configuration:");
console.log("URL:", supabaseUrl || "❌ MISSING");
console.log(
  "Key:",
  supabaseAnonKey ? `✅ ${supabaseAnonKey.substring(0, 20)}...` : "❌ MISSING"
);

// Validate configuration
if (
  !supabaseUrl ||
  supabaseUrl === "YOUR_SUPABASE_URL" ||
  supabaseUrl === "your_supabase_project_url_here"
) {
  console.error("❌ SUPABASE ERROR: URL not configured!");
  console.error("Create a .env.local file in your project root with:");
  console.error("REACT_APP_SUPABASE_URL=https://your-project.supabase.co");
  throw new Error("Supabase URL is not configured. Check .env.local file.");
}

if (
  !supabaseAnonKey ||
  supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY" ||
  supabaseAnonKey === "your_supabase_anon_key_here"
) {
  console.error("❌ SUPABASE ERROR: Anon key not configured!");
  console.error("Add to .env.local:");
  console.error("REACT_APP_SUPABASE_ANON_KEY=your_anon_key");
  throw new Error(
    "Supabase anon key is not configured. Check .env.local file."
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

console.log("✅ Supabase client created successfully");

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image: string;
          category: string;
          stock: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image: string;
          category: string;
          stock?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image?: string;
          category?: string;
          stock?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          email: string;
          first_name: string;
          last_name: string;
          address: string;
          apartment: string | null;
          city: string;
          state: string;
          zip_code: string;
          phone: string;
          subtotal: number;
          discount_code: string | null;
          discount_amount: number;
          shipping_cost: number;
          tax: number;
          total: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          email: string;
          first_name: string;
          last_name: string;
          address: string;
          apartment?: string | null;
          city: string;
          state: string;
          zip_code: string;
          phone: string;
          subtotal: number;
          discount_code?: string | null;
          discount_amount?: number;
          shipping_cost: number;
          tax: number;
          total: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          email?: string;
          first_name?: string;
          last_name?: string;
          address?: string;
          apartment?: string | null;
          city?: string;
          state?: string;
          zip_code?: string;
          phone?: string;
          subtotal?: number;
          discount_code?: string | null;
          discount_amount?: number;
          shipping_cost?: number;
          tax?: number;
          total?: number;
          status?: string;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image: string;
          size: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image: string;
          size: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          product_image?: string;
          size?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
    };
  };
}
