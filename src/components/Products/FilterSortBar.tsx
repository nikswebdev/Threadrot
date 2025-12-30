// src/components/Products/FilterSortBar.tsx - WITH DEBUG LOGGING
import React, { useState } from "react";
import {
  ChevronDown,
  SlidersHorizontal,
  Grid3x3,
  LayoutList,
} from "lucide-react";
import FilterDropdown from "./FilterDropdown";
import "./FilterSortBar.css";

interface FilterSortBarProps {
  onSortClick?: (sortOption: string) => void;
  gridView?: "grid" | "compact";
  onGridViewChange?: (view: "grid" | "compact") => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  onSortClick,
  gridView = "grid",
  onGridViewChange,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");

  console.log("🟣 FilterSortBar rendering with gridView:", gridView);
  console.log("🟣 onGridViewChange function exists?", !!onGridViewChange);

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

  const handleGridClick = () => {
    console.log("🟣 Grid button clicked!");
    if (onGridViewChange) {
      console.log("🟣 Calling onGridViewChange with 'grid'");
      onGridViewChange("grid");
    } else {
      console.log("🟣 ERROR: onGridViewChange is undefined!");
    }
  };

  const handleCompactClick = () => {
    console.log("🟣 Compact button clicked!");
    if (onGridViewChange) {
      console.log("🟣 Calling onGridViewChange with 'compact'");
      onGridViewChange("compact");
    } else {
      console.log("🟣 ERROR: onGridViewChange is undefined!");
    }
  };

  return (
    <>
      <div className="filter-sort-bar">
        {/* Filter Button (Left) */}
        <button
          className="control-button filter-button"
          onClick={handleFilterClick}
        >
          <SlidersHorizontal size={18} />
          <span className="filter-text-desktop">FILTERS:</span>
          <span className="filter-text-mobile">FILTER</span>
        </button>

        {/* Right Side Controls */}
        <div className="right-controls">
          {/* Grid View Buttons */}
          <div className="grid-view-controls">
            <button
              className={`grid-view-button ${
                gridView === "grid" ? "active" : ""
              }`}
              onClick={handleGridClick}
              aria-label="Grid view"
              title="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              className={`grid-view-button ${
                gridView === "compact" ? "active" : ""
              }`}
              onClick={handleCompactClick}
              aria-label="Compact view"
              title="Compact view"
            >
              <LayoutList size={18} />
            </button>
          </div>

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
      </div>

      {/* Filter Dropdown Modal */}
      <FilterDropdown isOpen={isFilterOpen} onClose={closeFilterDropdown} />
    </>
  );
};

export default FilterSortBar;
