// src/pages/Home.tsx - WITH ORIGINAL FILTERSORTBAR
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductGrid from "../components/Products/ProductGrid";
import FilterSortBar from "../components/Products/FilterSortBar";
import { Product } from "../types";
import "./Home.css";

interface SupabaseProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  category: string;
  stock: number;
  is_active: boolean;
  created_at: string;
}

const Home: React.FC = () => {
  const [supabaseProducts, setSupabaseProducts] = useState<SupabaseProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and sort state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("Newest First");
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("📦 Fetching products from Supabase...");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase error:", error);
        throw error;
      }

      console.log("✅ Products fetched:", data);
      setSupabaseProducts(data || []);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError("Failed to load products");
      setLoading(false);
    }
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? supabaseProducts
      : supabaseProducts.filter((p) => p.category === selectedCategory);

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      case "Name A-Z":
        return a.name.localeCompare(b.name);
      case "Newest First":
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  });

  // Convert Supabase products to Product type for ProductGrid
  const products: Product[] = sortedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.image,
    hoverImage: undefined,
    category: p.category,
    description: p.description || "",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black"],
    material: "Premium Cotton",
    isNew: true,
    isLowStock: p.stock < 10,
    isTrending: false,
    stockCount: p.stock,
    inStock: p.stock > 0,
  }));

  // Get unique categories from products
  const categories = [
    "all",
    ...Array.from(new Set(supabaseProducts.map((p) => p.category))),
  ];

  if (error) {
    return (
      <div className="home-page">
        <section className="products-section">
          <div className="error-message">
            <h2>⚠️ ERROR LOADING PRODUCTS</h2>
            <p>{error}</p>
            <p>Check browser console for details</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero is now in MainLayout - don't add it here */}

      <section className="products-section">
        <div className="products-header">
          <h2>LATEST DROPS</h2>
          {!loading && <p>{products.length} products available</p>}
        </div>

        {/* Original FilterSortBar */}
        {!loading && supabaseProducts.length > 0 && (
          <FilterSortBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            gridView={gridView}
            onGridViewChange={setGridView}
          />
        )}

        <ProductGrid
          products={products}
          loading={loading}
          gridView={gridView}
        />
      </section>
    </div>
  );
};

export default Home;
