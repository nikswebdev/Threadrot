import React from "react";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductForm from "./pages/Admin/AdminProductForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import MainLayout from "./components/Layout/MainLayout";
import AdminLayout from "./components/Layout/AdminLayout";
import CartSidebar from "./components/Cart/CartSidebar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Archive from "./pages/Archive";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminOrderDetail from "./pages/Admin/AdminOrderDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AdminAuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Customer-facing routes with MainLayout */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <MainLayout>
                    <ProductDetail />
                  </MainLayout>
                }
              />
              <Route
                path="/archive"
                element={
                  <MainLayout>
                    <Archive />
                  </MainLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <MainLayout>
                    <About />
                  </MainLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <MainLayout>
                    <Checkout />
                  </MainLayout>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/orders/:orderId"
                element={
                  <AdminLayout>
                    <AdminOrderDetail />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                }
              />{" "}
              {/* ADD */}
              <Route
                path="/admin/products/new"
                element={
                  <AdminLayout>
                    <AdminProductForm />
                  </AdminLayout>
                }
              />{" "}
              {/* ADD */}
              <Route
                path="/admin/products/edit/:productId"
                element={
                  <AdminLayout>
                    <AdminProductForm />
                  </AdminLayout>
                }
              />{" "}
              {/* ADD */}
              <Route
                path="/order-confirmation/:orderId"
                element={
                  <MainLayout>
                    <OrderConfirmation />
                  </MainLayout>
                }
              />
              {/* Admin login - no layout */}
              <Route path="/admin/login" element={<AdminLogin />} />
              {/* Admin routes with AdminLayout */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                }
              />
              <Route
                path="/admin/orders/:orderId"
                element={
                  <AdminLayout>
                    <AdminOrderDetail />
                  </AdminLayout>
                }
              />
              {/* 404 */}
              <Route
                path="*"
                element={
                  <MainLayout>
                    <div>404 - Page Not Found</div>
                  </MainLayout>
                }
              />
            </Routes>

            {/* Cart only shows on customer-facing pages */}
            <CartSidebar />
          </div>
        </Router>
      </AdminAuthProvider>
    </Provider>
  );
};

export default App;
