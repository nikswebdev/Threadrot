import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminAuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

// SIMPLE ADMIN PASSWORD (Replace with real auth later)
const ADMIN_PASSWORD = "threadrot2025"; // Change this to your secure password!

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const adminAuth = localStorage.getItem("threadrot_admin_auth");
    if (adminAuth === "authenticated") {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("threadrot_admin_auth", "authenticated");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("threadrot_admin_auth");
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
