// src/components/Products/FilterDropdown.tsx - WITH PORTAL
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setActiveCategory } from "../../store/slices/uiSlice";
import { filterProducts } from "../../store/slices/productsSlice";
import { categories, filterOptions } from "../../utils/data";
import "./FilterDropdown.css";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterKeys = "style" | "color" | "brand" | "size";

interface ActiveFiltersState {
  style: string;
  color: string;
  brand: string;
  size: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.ui.activeCategory);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFiltersState>({
    style: "",
    color: "",
    brand: "",
    size: "",
  });

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    category: true,
    style: false,
    color: false,
    brand: false,
    size: false,
  });

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    dispatch(filterProducts(categoryId));
  };

  const handleFilterChange = (filterType: FilterKeys, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      style: "",
      color: "",
      brand: "",
      size: "",
    });
    setInStockOnly(false);
    dispatch(setActiveCategory("all"));
    dispatch(filterProducts("all"));
  };

  const hasActiveFilters =
    activeFilters.style ||
    activeFilters.color ||
    activeFilters.brand ||
    activeFilters.size ||
    inStockOnly;

  const handleApply = () => {
    onClose();
  };

  if (!isOpen) return null;

  // Render using Portal to escape stacking context
  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div className="filter-dropdown-backdrop" onClick={onClose} />

      {/* Dropdown Panel */}
      <div className="filter-dropdown-panel">
        {/* Header */}
        <div className="filter-dropdown-header">
          <h3>FILTERS</h3>
          <button className="filter-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Clear All (only show if filters are active) */}
        {hasActiveFilters && (
          <div className="filter-clear-section">
            <button className="clear-all-btn" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="filter-dropdown-content">
          {/* Category Section */}
          <div className="filter-section">
            <button
              className={`filter-section-header ${
                expandedSections.category ? "expanded" : ""
              }`}
              onClick={() => toggleSection("category")}
            >
              <span>CATEGORY</span>
              <ChevronDown size={16} className="section-chevron" />
            </button>
            {expandedSections.category && (
              <div className="filter-section-options">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`filter-option ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span>{category.label}</span>
                    {category.year && (
                      <span className="filter-option-year">
                        {category.year}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Style Section */}
          <div className="filter-section">
            <button
              className={`filter-section-header ${
                expandedSections.style ? "expanded" : ""
              }`}
              onClick={() => toggleSection("style")}
            >
              <span>STYLE</span>
              <ChevronDown size={16} className="section-chevron" />
            </button>
            {expandedSections.style && (
              <div className="filter-section-options">
                {filterOptions.styles.map((style) => (
                  <div
                    key={style.id}
                    className={`filter-option ${
                      activeFilters.style === style.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("style", style.id)}
                  >
                    {style.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Color Section */}
          <div className="filter-section">
            <button
              className={`filter-section-header ${
                expandedSections.color ? "expanded" : ""
              }`}
              onClick={() => toggleSection("color")}
            >
              <span>COLOR</span>
              <ChevronDown size={16} className="section-chevron" />
            </button>
            {expandedSections.color && (
              <div className="filter-section-options">
                {filterOptions.colors.map((color) => (
                  <div
                    key={color.id}
                    className={`filter-option ${
                      activeFilters.color === color.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("color", color.id)}
                  >
                    {color.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand Section */}
          <div className="filter-section">
            <button
              className={`filter-section-header ${
                expandedSections.brand ? "expanded" : ""
              }`}
              onClick={() => toggleSection("brand")}
            >
              <span>BRAND</span>
              <ChevronDown size={16} className="section-chevron" />
            </button>
            {expandedSections.brand && (
              <div className="filter-section-options">
                {filterOptions.brands.map((brand) => (
                  <div
                    key={brand.id}
                    className={`filter-option ${
                      activeFilters.brand === brand.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("brand", brand.id)}
                  >
                    {brand.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Size Section */}
          <div className="filter-section">
            <button
              className={`filter-section-header ${
                expandedSections.size ? "expanded" : ""
              }`}
              onClick={() => toggleSection("size")}
            >
              <span>SIZE</span>
              <ChevronDown size={16} className="section-chevron" />
            </button>
            {expandedSections.size && (
              <div className="filter-section-options">
                {filterOptions.sizes.map((size) => (
                  <div
                    key={size.id}
                    className={`filter-option ${
                      activeFilters.size === size.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("size", size.id)}
                  >
                    {size.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* In Stock Toggle */}
          <div className="filter-toggle-section">
            <label className="filter-toggle-label">
              <input
                type="checkbox"
                className="filter-toggle-switch"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span className="filter-toggle-slider"></span>
              <span className="filter-toggle-text">IN STOCK ONLY</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="filter-dropdown-footer">
          <button className="apply-filters-btn" onClick={handleApply}>
            APPLY FILTERS
          </button>
        </div>
      </div>
    </>,
    document.body // Portal to document.body - escapes all stacking contexts!
  );
};

export default FilterDropdown;
