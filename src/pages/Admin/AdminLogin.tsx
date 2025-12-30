// src/pages/Admin/AdminLogin.tsx - ADMIN LOGIN PAGE

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { Lock, Shield } from "lucide-react";
import "./AdminLogin.css";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(password)) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <Shield size={48} />
          <h1>THREADROT ADMIN</h1>
          <p>Enter password to access dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-login-error">
              <Lock size={16} />
              {error}
            </div>
          )}

          <div className="admin-form-group">
            <label>Admin Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          <button type="submit" className="admin-login-btn">
            LOGIN TO DASHBOARD
          </button>
        </form>

        <div className="admin-login-footer">
          <p>🔒 Secure admin access</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
