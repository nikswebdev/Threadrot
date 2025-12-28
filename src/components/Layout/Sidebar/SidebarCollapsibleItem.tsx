// src/components/Layout/Sidebar/SidebarCollapsibleItem.tsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import "./Sidebar.css"; // Uses Sidebar.css for styling

interface SidebarCollapsibleItemProps {
  label: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
}

const SidebarCollapsibleItem: React.FC<SidebarCollapsibleItemProps> = ({
  label,
  children,
  initiallyExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-collapse if no content, or just handle initial state
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded, children]); // Re-evaluate max-height if children change

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="sidebar-collapsible-item">
      <div
        className={`vertical-category-item collapsible-header ${
          isExpanded ? "expanded" : ""
        }`}
        onClick={handleToggle}
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`collapsible-chevron ${isExpanded ? "rotate" : ""}`}
        />
      </div>
      <div ref={contentRef} className="collapsible-content">
        {children}
      </div>
    </div>
  );
};

export default SidebarCollapsibleItem;
