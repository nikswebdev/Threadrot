// FilterSortBar-Standalone.tsx - Works without Redux, keeps original style
import React, { useState, useEffect } from "react";
import { ChevronDown, Grid3x3, LayoutGrid } from "lucide-react";
import "./FilterSortBar.css";

interface FilterSortBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  gridView: "grid" | "compact";
  onGridViewChange: (view: "grid" | "compact") => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  gridView,
  onGridViewChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const sortOptions = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Name A-Z",
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle sticky behavior on mobile after scrolling past hero
  useEffect(() => {
    if (!isMobile) {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {
      // Assume hero is ~600px tall, adjust as needed
      const heroHeight = 600;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setIsFilterOpen(false);
  };

  const handleSortSelect = (option: string) => {
    onSortChange(option);
    setIsSortOpen(false);
  };

  const handleGridViewChange = (view: "grid" | "compact") => {
    onGridViewChange(view);
  };

  // Convert category names to display format
  const formatCategoryLabel = (cat: string) => {
    if (cat === "all") return "All Products";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className={`filter-sort-bar ${isSticky ? "sticky" : ""}`}>
      {/* Left: Filter Button (desktop) / Filter & Sort Button (mobile) */}
      <div style={{ position: "relative" }}>
        <button
          className="control-button filter-button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
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
          <span className="desktop-text">FILTER</span>
          <span className="mobile-text">FILTER & SORT</span>
        </button>

        {/* Filter Dropdown */}
        {isFilterOpen && (
          <div className="filter-dropdown-menu">
            {/* Category Section */}
            <div className="filter-section">Category</div>
            {categories.map((cat) => (
              <div
                key={cat}
                className={`dropdown-option ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {formatCategoryLabel(cat)}
              </div>
            ))}

            {/* Mobile: Include Sort Options */}
            {isMobile && (
              <>
                <div className="filter-section">Sort By</div>
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-option ${
                      selectedSort === option ? "active" : ""
                    }`}
                    onClick={() => handleSortSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Right: Grid View Controls + Sort (desktop only) */}
      <div className="right-controls">
        {/* Grid View Toggle */}
        <div className="grid-view-controls">
          <button
            className={`grid-view-button ${
              gridView === "grid" ? "active" : ""
            }`}
            onClick={() => handleGridViewChange("grid")}
            aria-label="Grid view"
          >
            <Grid3x3 size={18} />
          </button>
          <button
            className={`grid-view-button ${
              gridView === "compact" ? "active" : ""
            }`}
            onClick={() => handleGridViewChange("compact")}
            aria-label="Compact view"
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        {/* Sort Dropdown (Desktop Only) */}
        {!isMobile && (
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
                    className={`dropdown-option ${
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
        )}
      </div>
    </div>
  );
};

export default FilterSortBar;
