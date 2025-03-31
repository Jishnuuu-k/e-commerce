import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "../../../../Axios/Axios";
import "./sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/Users/all/categories");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const toggleSubcategories = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {isOpen && <div className="user-overlay" onClick={toggleSidebar}></div>}

      <div className={`user-sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="user-sidebar-header">
          <h2>Categories</h2>
          <button className="user-close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <ul className="user-sidebar-menu">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="user-category-item">
                <div className="user-category-header" onClick={() => toggleSubcategories(category._id)}>
                  <span>{category.categoryName}</span>
                  {expandedCategory === category._id ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {expandedCategory === category._id && (
                  <ul className="user-subcategory-menu">
                    {category.subcategories.map((sub) => (
                      <li key={sub._id} className="user-subcategory-item">
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
            <li className="user-no-data">No categories found</li>
          )}
        </ul>
      </div>
    </>
  );
};


export default Sidebar;
