import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "../../../../Axios/Axios";
import "./sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is expanded

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/Users/all/categories");
        setCategories(response.data); // Assuming response.data is an array of categories
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Toggle subcategory visibility
  const toggleSubcategories = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Categories</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <ul className="sidebar-menu">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="category-item">
                {/* Main Category */}
                <div className="category-header" onClick={() => toggleSubcategories(category._id)}>
                  <span>{category.categoryName}</span>
                  {expandedCategory === category._id ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {/* Subcategories - Show when expanded */}
                {expandedCategory === category._id && (
                  <ul className="subcategory-menu">
                    {category.subcategories.map((sub) => (
                      <li key={sub._id} className="subcategory-item">
                        <Link to={`/category/${sub.subCategoryName}`} onClick={toggleSidebar}>
                          {sub.subCategoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <li className="no-data">No categories found</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
