// src/pages/Admin/AdminProducts.tsx - PRODUCT MANAGEMENT

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabase";
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Package } from "lucide-react";
import "./AdminProducts.css";

interface Product {
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

const AdminProducts: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
  }, [isAdmin, navigate]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(filtered);
  };

  const toggleProductStatus = async (
    productId: string,
    currentStatus: boolean
  ) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ is_active: !currentStatus })
        .eq("id", productId);

      if (error) throw error;

      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, is_active: !currentStatus }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product status");
    }
  };

  const deleteProduct = async (productId: string, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      setProducts(products.filter((product) => product.id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const categories = Array.from(new Set(products.map((p) => p.category)));

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-title">
          <h1>Products</h1>
          <p>{filteredProducts.length} products found</p>
        </div>
        <Link to="/admin/products/new" className="add-product-btn">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        {/* Search */}
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="admin-filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="admin-products-grid">
        {filteredProducts.length === 0 ? (
          <div className="admin-empty-state">
            <Package size={48} />
            <p>No products found</p>
            <Link to="/admin/products/new" className="add-product-btn">
              <Plus size={18} />
              Add Your First Product
            </Link>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-card">
              <div className="product-card-image">
                <img src={product.image} alt={product.name} />
                {!product.is_active && (
                  <div className="inactive-overlay">
                    <span>INACTIVE</span>
                  </div>
                )}
              </div>

              <div className="product-card-content">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-stock">
                  Stock: {product.stock}
                  {product.stock === 0 && (
                    <span className="out-of-stock"> (Out of stock)</span>
                  )}
                </p>
              </div>

              <div className="product-card-actions">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="action-btn edit-btn"
                  title="Edit"
                >
                  <Edit size={16} />
                </Link>
                <button
                  className={`action-btn ${
                    product.is_active ? "active-btn" : "inactive-btn"
                  }`}
                  onClick={() =>
                    toggleProductStatus(product.id, product.is_active)
                  }
                  title={
                    product.is_active ? "Hide from store" : "Show in store"
                  }
                >
                  {product.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteProduct(product.id, product.name)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
