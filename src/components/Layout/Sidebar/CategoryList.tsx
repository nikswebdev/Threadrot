import React from "react";
import { Category } from "../../../types";

interface CategoryListProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <nav className="category-list">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`category-item ${
            activeCategory === cat.id ? "active" : ""
          }`}
          onClick={() => onCategoryChange(cat.id)}
        >
          <span>{cat.label}</span>
          {cat.year && <span className="category-year">{cat.year}</span>}
        </div>
      ))}
    </nav>
  );
};

export default CategoryList;
export {}; // Make it a module
