// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Archive from "./pages/Archive";
import About from "./pages/About";
import NewArrivals from "./pages/NewArrivals";
import ClothingCategory from "./pages/ClothingCategory";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/about" element={<About />} />

              {/* NEW ROUTES */}
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route
                path="/clothing/:category"
                element={<ClothingCategory />}
              />
              <Route
                path="/custom/create"
                element={
                  <div className="coming-soon">
                    Custom Creator - Coming Soon
                  </div>
                }
              />
              <Route
                path="/custom/submit"
                element={
                  <div className="coming-soon">Submit Design - Coming Soon</div>
                }
              />
              <Route
                path="/collabs"
                element={
                  <div className="coming-soon">Collabs - Coming Soon</div>
                }
              />
              <Route
                path="/essentials"
                element={
                  <div className="coming-soon">
                    Plain Tees & Essentials - Coming Soon
                  </div>
                }
              />
              <Route
                path="/accessories"
                element={
                  <div className="coming-soon">Accessories - Coming Soon</div>
                }
              />

              <Route
                path="*"
                element={<div className="not-found">404 - Page Not Found</div>}
              />
            </Routes>
          </MainLayout>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
