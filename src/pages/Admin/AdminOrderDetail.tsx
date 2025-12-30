// src/pages/Admin/AdminOrderDetail.tsx - SINGLE ORDER DETAIL VIEW

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabase";
import {
  ChevronLeft,
  Printer,
  Package,
  MapPin,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Truck,
  Copy,
  Check,
} from "lucide-react";
import "./AdminOrderDetail.css";

interface Order {
  id: string;
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
  order_items: any[];
}

const AdminOrderDetail: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [isAdmin, orderId, navigate]);

  const fetchOrder = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order:", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return;

    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", order.id);

      if (error) throw error;

      setOrder({ ...order, status: newStatus });
      alert(`Order status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printOrder = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="admin-loading">
        <p>Order not found</p>
        <Link to="/admin/orders" className="back-btn">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-order-detail-page">
      {/* Header */}
      <div className="admin-order-detail-header">
        <div className="header-left">
          <div>
            <h1>Order Details</h1>
            <div className="order-id-display">
              <span>{order.id}</span>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(order.id)}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="print-btn" onClick={printOrder}>
            <Printer size={18} />
            Print
          </button>
        </div>
      </div>

      <div className="admin-order-detail-content">
        {/* Left Column */}
        <div className="order-detail-main">
          {/* Status Card */}
          <div className="detail-card">
            <h2>
              <Package size={20} />
              Order Status
            </h2>
            <div className="status-controls">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(e.target.value)}
                className={`status-select-large status-${order.status}`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="order-date">
                <Calendar size={16} />
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="detail-card">
            <h2>Order Items ({order.order_items?.length || 0})</h2>
            <div className="order-items-list">
              {order.order_items?.map((item) => (
                <div key={item.id} className="order-item-detail">
                  <img src={item.product_image} alt={item.product_name} />
                  <div className="item-info">
                    <h4>{item.product_name}</h4>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${item.price.toFixed(2)} each
                    <br />
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Printful/Fulfillment Card */}
          <div className="detail-card">
            <h2>
              <Truck size={20} />
              Fulfillment
            </h2>
            <div className="fulfillment-section">
              <p className="fulfillment-note">
                Submit this order to Printful or your print provider
              </p>
              <div className="tracking-input">
                <input
                  type="text"
                  placeholder="Add tracking number..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button className="add-tracking-btn">Save Tracking</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="order-detail-sidebar">
          {/* Customer Card */}
          <div className="detail-card">
            <h2>Customer Details</h2>
            <div className="customer-details">
              <div className="detail-row">
                <Mail size={16} />
                <div>
                  <label>Email</label>
                  <p>{order.email}</p>
                </div>
              </div>
              <div className="detail-row">
                <Phone size={16} />
                <div>
                  <label>Phone</label>
                  <p>{order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="detail-card">
            <h2>
              <MapPin size={20} />
              Shipping Address
            </h2>
            <div className="shipping-address">
              <p>
                <strong>
                  {order.first_name} {order.last_name}
                </strong>
              </p>
              <p>{order.address}</p>
              {order.apartment && <p>{order.apartment}</p>}
              <p>
                {order.city}, {order.state} {order.zip_code}
              </p>
            </div>
            <button
              className="copy-address-btn"
              onClick={() =>
                copyToClipboard(
                  `${order.first_name} ${order.last_name}\n${order.address}\n${
                    order.apartment || ""
                  }\n${order.city}, ${order.state} ${order.zip_code}`
                )
              }
            >
              <Copy size={14} />
              Copy Address
            </button>
          </div>

          {/* Order Summary Card */}
          <div className="detail-card">
            <h2>
              <DollarSign size={20} />
              Order Summary
            </h2>
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount_code && (
                <div className="summary-row discount">
                  <span>Discount ({order.discount_code})</span>
                  <span>-${order.discount_amount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {order.shipping_cost === 0
                    ? "FREE"
                    : `$${order.shipping_cost.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
