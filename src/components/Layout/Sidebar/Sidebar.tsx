// src/components/Layout/Sidebar/Sidebar.tsx
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setActiveCategory } from "../../../store/slices/uiSlice";
import { filterProducts } from "../../../store/slices/productsSlice";
import SidebarCollapsibleItem from "./SidebarCollapsibleItem";
import InStockToggle from "./InStockToggle";
import { categories, filterOptions } from "../../../utils/data";
// REMOVED: import ArchiveLogo from "../../UI/ArchiveLogo"; // Remove this line
import "./Sidebar.css";

type FilterKeys = "style" | "color" | "brand" | "size";

interface ActiveFiltersState {
  style: string;
  color: string;
  brand: string;
  size: string;
}

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.ui.activeCategory);
  const [inStockOnly, setInStockOnly] = useState(false);

  const [activeFilters, setActiveFilters] = useState<ActiveFiltersState>({
    style: "",
    color: "",
    brand: "",
    size: "",
  });

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    dispatch(filterProducts(categoryId));
  };

  const handleFilterOptionClick = (
    filterType: FilterKeys,
    optionId: string
  ) => {
    setActiveFilters((prev) => {
      const newFilterValue = optionId === prev[filterType] ? "" : optionId;
      return {
        ...prev,
        [filterType]: newFilterValue,
      };
    });
    console.log(`Filter ${filterType} set to: ${optionId}`);
  };

  const handleInStockToggle = (checked: boolean) => {
    setInStockOnly(checked);
    console.log(`In Stock Only: ${checked}`);
  };

  return (
    <div className="sidebar-below-hero">
      <div className="sidebar-content">
        {/* REMOVED: ArchiveLogo re-added here. */}
        {/* <div className="sidebar-logo-wrapper">
          <ArchiveLogo width={150} />
        </div> */}

        <nav className="vertical-category-list">
          {/* Category Filter */}
          <SidebarCollapsibleItem label="Category" initiallyExpanded={true}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`sidebar-option ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <span>{cat.label}</span>
                {cat.year && (
                  <span className="sidebar-option-year">{cat.year}</span>
                )}
              </div>
            ))}
          </SidebarCollapsibleItem>

          {/* Style Filter */}
          <SidebarCollapsibleItem label="Style">
            {filterOptions.styles.map((option) => (
              <div
                key={option.id}
                className={`sidebar-option ${
                  activeFilters.style === option.id ? "active" : ""
                }`}
                onClick={() => handleFilterOptionClick("style", option.id)}
              >
                {option.label}
              </div>
            ))}
          </SidebarCollapsibleItem>

          {/* Color Filter */}
          <SidebarCollapsibleItem label="Color">
            {filterOptions.colors.map((option) => (
              <div
                key={option.id}
                className={`sidebar-option ${
                  activeFilters.color === option.id ? "active" : ""
                }`}
                onClick={() => handleFilterOptionClick("color", option.id)}
              >
                {option.label}
              </div>
            ))}
          </SidebarCollapsibleItem>

          {/* Brand Filter */}
          <SidebarCollapsibleItem label="Brand">
            {filterOptions.brands.map((option) => (
              <div
                key={option.id}
                className={`sidebar-option ${
                  activeFilters.brand === option.id ? "active" : ""
                }`}
                onClick={() => handleFilterOptionClick("brand", option.id)}
              >
                {option.label}
              </div>
            ))}
          </SidebarCollapsibleItem>

          {/* Size Filter */}
          <SidebarCollapsibleItem label="Size">
            {filterOptions.sizes.map((option) => (
              <div
                key={option.id}
                className={`sidebar-option ${
                  activeFilters.size === option.id ? "active" : ""
                }`}
                onClick={() => handleFilterOptionClick("size", option.id)}
              >
                {option.label}
              </div>
            ))}
          </SidebarCollapsibleItem>

          {/* "In Stock Only" toggle at the bottom of the list */}
          <InStockToggle
            label="In Stock Only"
            isChecked={inStockOnly}
            onToggle={handleInStockToggle}
          />
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-description">
            Threadrot preserves the ephemeral nature of internet culture through
            physical artifacts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
