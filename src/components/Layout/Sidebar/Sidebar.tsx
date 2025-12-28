import React from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setActiveCategory } from "../../../store/slices/uiSlice";
import { filterProducts } from "../../../store/slices/productsSlice";
import ArchiveLogo from "../../UI/ArchiveLogo";
import { categories } from "../../../utils/data";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.ui.activeCategory);

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    dispatch(filterProducts(categoryId));
  };

  return (
    <div className="sidebar-below-hero">
      <div className="sidebar-content">
        <div className="sidebar-header-vertical">
          <ArchiveLogo width={150} />
          <div className="sidebar-status-vertical">
            <span className="status-indicator active"></span>
            <div>
              <div>SYSTEM ONLINE</div>
              <div>LOC: NET_ARCHIVE_01</div>
            </div>
          </div>
        </div>

        <nav className="vertical-category-list">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`vertical-category-item ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span>{cat.label}</span>
              {cat.year && (
                <span className="vertical-category-year">{cat.year}</span>
              )}
            </div>
          ))}
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
export {};
