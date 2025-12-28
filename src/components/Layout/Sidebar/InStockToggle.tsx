// src/components/Layout/Sidebar/InStockToggle.tsx
import React from "react";
import "./Sidebar.css"; // Uses Sidebar.css for styling

interface InStockToggleProps {
  label: string;
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

const InStockToggle: React.FC<InStockToggleProps> = ({
  label,
  isChecked,
  onToggle,
}) => {
  return (
    <div className="in-stock-toggle-wrapper">
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onToggle(e.target.checked)}
          className="toggle-switch"
        />
        <span className="toggle-slider"></span>
        <span className="toggle-text">{label}</span>
      </label>
    </div>
  );
};

export default InStockToggle;
