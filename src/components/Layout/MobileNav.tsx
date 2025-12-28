import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setActiveCategory } from "../../store/slices/uiSlice";
import { filterProducts } from "../../store/slices/productsSlice";
import { categories } from "../../utils/data";

const MobileNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.ui.activeCategory);
  const screenWidth = useAppSelector((state) => state.ui.screenWidth);

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    dispatch(filterProducts(categoryId));
  };

  if (screenWidth > 600) {
    return null;
  }

  return (
    <nav className="mobile-nav">
      <select
        value={activeCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="mobile-category-select"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label} {cat.year && `(${cat.year})`}
          </option>
        ))}
      </select>
    </nav>
  );
};

export default MobileNav;
export {};
