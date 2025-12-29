// src/components/Products/FilterDropdown.tsx
import React, { useState } from "react";
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
    activeCategory !== "all" ||
    Object.values(activeFilters).some((val) => val !== "") ||
    inStockOnly;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="filter-dropdown-backdrop" onClick={onClose} />

      {/* Dropdown Panel */}
      <div className="filter-dropdown-panel">
        {/* Header */}
        <div className="filter-dropdown-header">
          <h3>FILTERS</h3>
          <button className="filter-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Clear All Button */}
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
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`filter-option ${
                      activeCategory === cat.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span>{cat.label}</span>
                    {cat.year && (
                      <span className="filter-option-year">{cat.year}</span>
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
                {filterOptions.styles.map((option) => (
                  <div
                    key={option.id}
                    className={`filter-option ${
                      activeFilters.style === option.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterOptionClick("style", option.id)}
                  >
                    {option.label}
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
                {filterOptions.colors.map((option) => (
                  <div
                    key={option.id}
                    className={`filter-option ${
                      activeFilters.color === option.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterOptionClick("color", option.id)}
                  >
                    {option.label}
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
                {filterOptions.brands.map((option) => (
                  <div
                    key={option.id}
                    className={`filter-option ${
                      activeFilters.brand === option.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterOptionClick("brand", option.id)}
                  >
                    {option.label}
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
                {filterOptions.sizes.map((option) => (
                  <div
                    key={option.id}
                    className={`filter-option ${
                      activeFilters.size === option.id ? "active" : ""
                    }`}
                    onClick={() => handleFilterOptionClick("size", option.id)}
                  >
                    {option.label}
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

        {/* Footer - Apply Button */}
        <div className="filter-dropdown-footer">
          <button className="apply-filters-btn" onClick={onClose}>
            APPLY FILTERS
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDropdown;
