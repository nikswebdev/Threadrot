// src/pages/Archive.tsx
import React from "react";
import ProductGridContainer from "../components/Products/ProductGridContainer";

const Archive: React.FC = () => {
  return (
    <div className="archive-page">
      <div className="archive-header">
        <h1>FULL ARCHIVE</h1>
        <p>Browse our complete collection of meme artifacts</p>
      </div>
      <ProductGridContainer />
    </div>
  );
};

export default Archive;
