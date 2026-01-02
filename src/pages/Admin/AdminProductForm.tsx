// src/pages/Admin/AdminProductForm.tsx - ADD/EDIT PRODUCT

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabase";
import { Save, X, Upload } from "lucide-react";
import "./AdminProductForm.css";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  stock: string;
  is_active: boolean;
}

const AdminProductForm: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const isEditMode = !!productId;

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "t-shirts",
    stock: "0",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    if (isEditMode && productId) {
      fetchProduct(productId);
    }
  }, [isAdmin, isEditMode, productId, navigate]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setFormData({
        name: data.name,
        description: data.description || "",
        price: data.price.toString(),
        image: data.image,
        category: data.category,
        stock: data.stock.toString(),
        is_active: data.is_active,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to load product");
      navigate("/admin/products");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (!formData.image.trim()) {
      alert("Product image URL is required");
      return;
    }

    setSaving(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        image: formData.image.trim(),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        is_active: formData.is_active,
      };

      if (isEditMode && productId) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", productId);

        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
        alert("Product created successfully!");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="admin-product-form-page">
      <div className="form-header">
        <h1>{isEditMode ? "Edit Product" : "Add New Product"}</h1>
        <button
          className="cancel-btn"
          onClick={() => navigate("/admin/products")}
        >
          <X size={18} />
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-section">
              <h2>Product Information</h2>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Cyberpunk T-Shirt"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product description..."
                  rows={4}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price * ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="35.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="100"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="t-shirts">T-Shirts</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="accessories">Accessories</option>
                  <option value="bottoms">Bottoms</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <span>Active (visible in store)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-section">
              <h2>Product Image</h2>

              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="form-help">
                  Enter the full URL of your product image from Printful or
                  image host
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="image-preview">
                  <p className="preview-label">Preview:</p>
                  <img
                    src={formData.image}
                    alt="Product preview"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".image-error")) {
                        const errorDiv = document.createElement("div");
                        errorDiv.className = "image-error";
                        errorDiv.textContent =
                          "⚠️ Image failed to load. Check URL.";
                        errorDiv.style.cssText =
                          "padding: 20px; background: rgba(255,68,68,0.1); border: 1px solid rgba(255,68,68,0.3); border-radius: 6px; color: #ff4444; text-align: center;";
                        parent.appendChild(errorDiv);
                      }
                    }}
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "block";
                      const parent = target.parentElement;
                      const errorDiv = parent?.querySelector(".image-error");
                      if (errorDiv) {
                        errorDiv.remove();
                      }
                    }}
                    style={{ display: "block" }}
                  />
                </div>
              )}

              <div className="form-info-box">
                <h3>📸 Getting Product Images:</h3>
                <ol>
                  <li>Design your product in Printful</li>
                  <li>Generate mockup images</li>
                  <li>Download/copy the image URL</li>
                  <li>Paste URL here</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? (
              <>
                <div className="loading-spinner small"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditMode ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
