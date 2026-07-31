// Import React
import React from "react";

// Import the CSS file that styles this sidebar
import "./Sidebar.css";

// This is the Sidebar component.
// It receives everything it needs as props from the parent (Home.jsx):
// - categories: list of all categories
// - subCategories: list of all subcategories
// - openCategory: which category is currently expanded (or null)
// - checkedSubCategories: array of subcategory IDs the user has checked
// - onToggleCategory: function to expand/collapse a category row
// - onToggleSubCategory: function to check/uncheck a subcategory
// - onClearFilter: function to reset back to "All categories"
export default function Sidebar({
  categories,
  subCategories,
  openCategory,
  checkedSubCategories,
  onToggleCategory,
  onToggleSubCategory,
  onClearFilter,
}) {
  return (
    <aside className="pl-sidebar">
      <h4 className="pl-sidebar-title">Categories</h4>

      <ul className="pl-cat-list">
        {/* "All categories" row - clicking this clears every filter */}
        <li
          className={
            "pl-cat-item" +
            (checkedSubCategories.length === 0 && !openCategory
              ? " active"
              : "")
          }
          onClick={onClearFilter}
        >
          All categories
        </li>

        {/* Loop through every category and render a row for each one */}
        {categories.map((cat) => {
          // Find only the subcategories that belong to this category
          const catSubCategories = subCategories.filter((sub) => {
            const subCatRef = sub.category ?? sub.categoryId;
            const subCatId =
              typeof subCatRef === "object" && subCatRef !== null
                ? subCatRef._id
                : subCatRef;

            return subCatId === cat._id;
          });

          // Is this category currently expanded?
          const isOpen = openCategory === cat._id;

          return (
            <li key={cat._id} className="pl-cat-group">
              {/* Category name row - clicking it expands/collapses the subcategory list */}
              <div
                className="pl-cat-row"
                onClick={() => onToggleCategory(cat._id)}
              >
                <span>{cat.categoryName}</span>
                <span className="pl-chevron">{isOpen ? "⌄" : "›"}</span>
              </div>

              {/* Only show subcategories if this category is open AND it has subcategories */}
              {isOpen && catSubCategories.length > 0 && (
                <ul className="pl-sub-list">
                  {catSubCategories.map((sub) => {
                    // Is this subcategory currently checked?
                    const checked = checkedSubCategories.includes(sub._id);

                    return (
                      <li
                        key={sub._id}
                        className="pl-subcat-row"
                        onClick={() => onToggleSubCategory(sub._id)}
                      >
                        {/* Checkbox square - filled dark when checked */}
                        <span
                          className={
                            "pl-checkbox" +
                            (checked ? " pl-checkbox-checked" : "")
                          }
                        >
                          {checked ? "✓" : ""}
                        </span>

                        <span className="pl-subcat-label">
                          {sub.subCategoryName}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}