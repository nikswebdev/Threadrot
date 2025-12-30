// src/pages/Admin/AdminDashboard.tsx - MAIN ADMIN DASHBOARD

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { supabase } from "../../lib/supabase";
import {
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
} from "lucide-react";
import "./AdminDashboard.css";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  recentOrders: any[];
}

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
    fetchDashboardData();
  }, [isAdmin, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch all orders
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (*)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate stats
      const totalRevenue =
        orders?.reduce((sum, order) => sum + order.total, 0) || 0;
      const totalOrders = orders?.length || 0;
      const pendingOrders =
        orders?.filter((o) => o.status === "pending").length || 0;
      const completedOrders =
        orders?.filter((o) => o.status === "completed").length || 0;
      const recentOrders = orders?.slice(0, 5) || [];

      setStats({
        totalRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        recentOrders,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card revenue">
          <div className="stat-icon">
            <DollarSign size={32} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">
            <ShoppingBag size={32} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Orders</p>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="admin-stat-card pending">
          <div className="stat-icon">
            <Clock size={32} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Orders</p>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="admin-stat-card completed">
          <div className="stat-icon">
            <CheckCircle size={32} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completedOrders}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2>Recent Orders</h2>
          <Link to="/admin/orders" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="admin-table-container">
          {stats.recentOrders.length === 0 ? (
            <div className="admin-empty-state">
              <Package size={48} />
              <p>No orders yet</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="order-id-link"
                      >
                        {order.id.substring(0, 8)}...
                      </Link>
                    </td>
                    <td>
                      {order.first_name} {order.last_name}
                      <br />
                      <span className="text-muted">{order.email}</span>
                    </td>
                    <td>{order.order_items?.length || 0} items</td>
                    <td className="text-success">${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/admin/orders?status=pending" className="quick-action-card">
            <AlertCircle size={24} />
            <span>Process Pending Orders</span>
          </Link>
          <Link to="/admin/products/new" className="quick-action-card">
            <Package size={24} />
            <span>Add New Product</span>
          </Link>
          <Link to="/admin/orders" className="quick-action-card">
            <TrendingUp size={24} />
            <span>View Sales Report</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
