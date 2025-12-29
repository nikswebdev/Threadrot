// src/components/Products/FilterSortBar.tsx - CSS-ONLY RESPONSIVE VERSION
import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import "./FilterSortBar.css";

interface FilterSortBarProps {
  onSortClick?: (sortOption: string) => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({ onSortClick }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");

  const sortOptions = [
    "Recommended",
    "Newest Arrivals",
    "Price: Low to High",
    "Price: High to Low",
    "Rot Level: High",
  ];

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setIsSortOpen(false);
    if (onSortClick) onSortClick(option);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const closeFilterDropdown = () => {
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="filter-sort-bar">
        {/* Filter Button - CSS handles responsive text and active/inactive state */}
        <button
          className="control-button filter-button"
          onClick={handleFilterClick}
        >
          <SlidersHorizontal size={18} />
          <span className="filter-text-desktop">FILTERS:</span>
          <span className="filter-text-mobile">FILTER</span>
        </button>

        {/* Sort Button with Dropdown */}
        <div className="sort-dropdown-wrapper">
          <button
            className="control-button sort-button"
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <span className="sort-label">SORT BY:</span>
            <span className="sort-value">{selectedSort}</span>
            <ChevronDown
              size={16}
              className={`sort-chevron ${isSortOpen ? "open" : ""}`}
            />
          </button>

          {isSortOpen && (
            <div className="sort-dropdown-menu">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className={`sort-option ${
                    selectedSort === option ? "active" : ""
                  }`}
                  onClick={() => handleSortSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Dropdown Modal */}
      <FilterDropdown isOpen={isFilterOpen} onClose={closeFilterDropdown} />
    </>
  );
};

export default FilterSortBar;
