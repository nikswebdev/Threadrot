// src/components/Products/FilterSortBar.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Using lucide for the chevron
import "./FilterSortBar.css";

interface FilterSortBarProps {
  onFilterClick?: () => void;
  onSortClick?: (sortOption: string) => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  onFilterClick,
  onSortClick,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
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

  return (
    <div className="filter-sort-bar">
      {/* Filter Button (Left) - Standard Funnel Icon */}
      <button className="control-button filter-button" onClick={onFilterClick}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span>FILTER</span>
      </button>

      {/* Sort Button (Right) with Dropdown */}
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
  );
};

export default FilterSortBar;
