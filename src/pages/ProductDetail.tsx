// src/pages/ProductDetail.tsx - FIXED
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSelectedProduct } from "../store/slices/productsSlice";
import { Product } from "../types";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const selectedProduct = useAppSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    if (id) {
      // id is string, p.id is string - no need to parseInt!
      const foundProduct = products.find((p: Product) => p.id === id);
      dispatch(setSelectedProduct(foundProduct));
    }
  }, [id, products, dispatch]);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{selectedProduct.name}</h1>
      <img src={selectedProduct.image} alt={selectedProduct.name} />
      <p>${selectedProduct.price.toFixed(2)}</p>
      <p>{selectedProduct.description}</p>
    </div>
  );
};

export default ProductDetail;
