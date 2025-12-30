// src/pages/Admin/AdminOrders.tsx - COMPLETE ORDER MANAGEMENT

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabase";
import {
  Package,
  Search,
  Filter,
  Download,
  ChevronLeft,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import "./AdminOrders.css";

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

const AdminOrders: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    fetchOrders();
  }, [isAdmin, navigate]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.email.toLowerCase().includes(term) ||
          `${order.first_name} ${order.last_name}`.toLowerCase().includes(term)
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      // Update local state
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      alert(`Order status updated to: ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  const exportToCSV = () => {
    const csv = [
      [
        "Order ID",
        "Date",
        "Customer",
        "Email",
        "Items",
        "Total",
        "Status",
      ].join(","),
      ...filteredOrders.map((order) =>
        [
          order.id,
          new Date(order.created_at).toLocaleDateString(),
          `${order.first_name} ${order.last_name}`,
          order.email,
          order.order_items?.length || 0,
          order.total.toFixed(2),
          order.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `threadrot-orders-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "processing":
        return <Package size={16} />;
      case "shipped":
        return <Truck size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-title">
          <h1>Orders</h1>
          <p>{filteredOrders.length} orders found</p>
        </div>
        <button className="export-btn" onClick={exportToCSV}>
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        {/* Search */}
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by order ID, email, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="admin-filter-group">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Quick Stats */}
        <div className="admin-quick-stats">
          <span className="quick-stat">
            Total: $
            {filteredOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-orders-table-container">
        {filteredOrders.length === 0 ? (
          <div className="admin-empty-state">
            <Package size={48} />
            <p>No orders found</p>
            {searchTerm || statusFilter !== "all" ? (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id-cell">
                      <span className="order-id-short">
                        {order.id.substring(0, 8)}...
                      </span>
                      <span className="order-id-full">{order.id}</span>
                    </div>
                  </td>
                  <td className="text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                    <br />
                    <span className="time-text">
                      {new Date(order.created_at).toLocaleTimeString()}
                    </span>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <strong>
                        {order.first_name} {order.last_name}
                      </strong>
                      <span className="text-muted">{order.email}</span>
                    </div>
                  </td>
                  <td>{order.order_items?.length || 0} items</td>
                  <td className="text-success">
                    <strong>${order.total.toFixed(2)}</strong>
                  </td>
                  <td>
                    <div className="status-cell">
                      {getStatusIcon(order.status)}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`status-select status-${order.status}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="view-order-btn"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
