import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setSelectedProduct } from "../store/slices/productsSlice";
import { Product } from "../types";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.selectedProduct);
  const products = useAppSelector((state) => state.products.items);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p: Product) => p.id === parseInt(id));
      dispatch(setSelectedProduct(foundProduct));
    }
  }, [id, products, dispatch]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-button">
        ← Back to Archive
      </Link>
      <h1>{product.name}</h1>
      {/* Add product detail content */}
    </div>
  );
};

export default ProductDetail;
export {}; // Make it a module
