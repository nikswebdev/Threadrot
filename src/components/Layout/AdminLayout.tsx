// src/components/Layout/AdminLayout.tsx - ADMIN-SPECIFIC LAYOUT

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import "./AdminLayout.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <div className="admin-layout">
      {/* Admin Navigation */}
      <nav className="admin-navbar">
        <div className="admin-navbar-container">
          {/* Logo/Brand */}
          <div className="admin-brand">
            <Shield size={24} />
            <span>THREADROT ADMIN</span>
          </div>

          {/* Navigation Links */}
          <div className="admin-nav-links">
            <Link
              to="/admin/dashboard"
              className={`admin-nav-link ${
                isActive("/admin/dashboard") ? "active" : ""
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin/orders"
              className={`admin-nav-link ${
                isActive("/admin/orders") ? "active" : ""
              }`}
            >
              <ShoppingBag size={18} />
              <span>Orders</span>
            </Link>

            <Link
              to="/admin/products"
              className={`admin-nav-link ${
                isActive("/admin/products") ? "active" : ""
              }`}
            >
              <Package size={18} />
              <span>Products</span>
            </Link>

            <Link
              to="/admin/customers"
              className={`admin-nav-link ${
                isActive("/admin/customers") ? "active" : ""
              }`}
            >
              <Users size={18} />
              <span>Customers</span>
            </Link>

            <Link
              to="/admin/settings"
              className={`admin-nav-link ${
                isActive("/admin/settings") ? "active" : ""
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </div>

          {/* Right Side - Logout & Store Link */}
          <div className="admin-nav-actions">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="view-store-link"
            >
              View Store →
            </a>
            <button className="admin-logout-nav-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="admin-main-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
