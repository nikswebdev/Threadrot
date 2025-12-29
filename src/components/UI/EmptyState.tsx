// src/components/UI/EmptyState.tsx
import React from "react";
import { Search, Package } from "lucide-react";
import "./EmptyState.css";

interface EmptyStateProps {
  type?: "no-results" | "no-products";
  onClearFilters?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type = "no-results",
  onClearFilters,
}) => {
  if (type === "no-results") {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Search size={64} />
        </div>
        <h3 className="empty-state-title">NO PRODUCTS FOUND</h3>
        <p className="empty-state-description">
          We couldn't find any products matching your filters.
          <br />
          Try adjusting your search or clearing filters.
        </p>
        {onClearFilters && (
          <button className="empty-state-cta" onClick={onClearFilters}>
            CLEAR ALL FILTERS
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Package size={64} />
      </div>
      <h3 className="empty-state-title">COMING SOON</h3>
      <p className="empty-state-description">
        New drops every week.
        <br />
        Check back soon for fresh designs.
      </p>
      <button className="empty-state-cta">NOTIFY ME</button>
    </div>
  );
};

export default EmptyState;
