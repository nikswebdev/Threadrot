import React from "react";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./components/Layout/MainLayout";
import CartSidebar from "./components/Cart/CartSidebar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Archive from "./pages/Archive";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AdminAuthProvider>
        <Router>
          <div className="App">
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/order-confirmation/:orderId"
                  element={<OrderConfirmation />}
                />
                <Route path="*" element={<div>404 - Page Not Found</div>} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </MainLayout>
            <CartSidebar />
          </div>
        </Router>
      </AdminAuthProvider>
    </Provider>
  );
};

export default App;
