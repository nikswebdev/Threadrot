// src/pages/OrderConfirmation.tsx - ORDER CONFIRMATION PAGE
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderService } from "../services/orderService";
import { CheckCircle, Package, Truck, Mail, Download } from "lucide-react";
import "./OrderConfirmation.css";

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
  order_items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  size: string;
  quantity: number;
  price: number;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      console.log("🔍 OrderConfirmation - orderId:", orderId);

      if (!orderId) {
        console.log("❌ No orderId found, redirecting to home");
        navigate("/");
        return;
      }

      try {
        console.log("📦 Fetching order from Supabase...");
        const orderData = await orderService.getOrder(orderId);
        console.log("✅ Order fetched successfully:", orderData);
        setOrder(orderData);
      } catch (error) {
        console.error("❌ Error fetching order:", error);
        // Don't redirect immediately - show error instead
        alert("Could not load order. Order ID: " + orderId);
        // navigate("/");
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (!order) {
    return (
      <div className="order-confirmation-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const orderDate = new Date(order.created_at);
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-container">
        {/* Success Header */}
        <div className="confirmation-header">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>ORDER CONFIRMED!</h1>
          <p className="confirmation-message">
            Thank you for your order! We've sent a confirmation email to{" "}
            <strong>{order.email}</strong>
          </p>
          <p className="order-number">
            Order Number: <span>{order.id}</span>
          </p>
        </div>

        {/* Order Timeline */}
        <div className="order-timeline">
          <div className="timeline-step active">
            <div className="timeline-icon">
              <CheckCircle size={24} />
            </div>
            <div className="timeline-content">
              <h3>Order Placed</h3>
              <p>{orderDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="timeline-connector"></div>

          <div className="timeline-step">
            <div className="timeline-icon">
              <Package size={24} />
            </div>
            <div className="timeline-content">
              <h3>Processing</h3>
              <p>1-2 business days</p>
            </div>
          </div>

          <div className="timeline-connector"></div>

          <div className="timeline-step">
            <div className="timeline-icon">
              <Truck size={24} />
            </div>
            <div className="timeline-content">
              <h3>Shipped</h3>
              <p>3-5 business days</p>
            </div>
          </div>

          <div className="timeline-connector"></div>

          <div className="timeline-step">
            <div className="timeline-icon">
              <Mail size={24} />
            </div>
            <div className="timeline-content">
              <h3>Delivered</h3>
              <p>Est. {estimatedDelivery.toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="confirmation-content">
          {/* Order Details */}
          <div className="confirmation-main">
            <div className="order-section">
              <h2>Order Details</h2>

              <div className="order-items">
                {order.order_items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.product_image} alt={item.product_name} />
                    <div className="order-item-details">
                      <h4>{item.product_name}</h4>
                      <p className="order-item-meta">
                        Size: {item.size} • Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="order-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-section">
              <h2>Shipping Address</h2>
              <div className="address-box">
                <p>
                  {order.first_name} {order.last_name}
                  <br />
                  {order.address}
                  {order.apartment && `, ${order.apartment}`}
                  <br />
                  {order.city}, {order.state} {order.zip_code}
                  <br />
                  {order.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="confirmation-sidebar">
            <div className="order-summary-card">
              <h3>Order Summary</h3>

              <div className="summary-totals">
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

              <button className="download-receipt-btn">
                <Download size={18} />
                DOWNLOAD RECEIPT
              </button>
            </div>

            <div className="next-steps-card">
              <h3>What's Next?</h3>
              <ul>
                <li>
                  <CheckCircle size={16} />
                  <span>Order confirmation email sent</span>
                </li>
                <li>
                  <Package size={16} />
                  <span>We'll send shipping updates to your email</span>
                </li>
                <li>
                  <Truck size={16} />
                  <span>Track your package with the tracking number</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </button>
          <button
            className="view-orders-btn"
            onClick={() => navigate("/account/orders")}
          >
            VIEW ALL ORDERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
