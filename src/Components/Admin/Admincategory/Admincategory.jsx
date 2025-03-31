import React, { useState, useEffect } from 'react';
import axios from '../../../../Axios/Axios'; // Ensure correct path
import './admincategory.css';

function AdminCategory({ sidebarWidth }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const mainStyle = {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

  // Fetch Categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/Admin/get/categories');
        setCategories(response.data); // Ensure response data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Add New Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await axios.post('/Admin/category', { name });
      setCategories([...categories, response.data]); // Append new category
      setName(''); // Reset input field
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Add New Subcategory
  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !selectedCategory) return;

    try {
      const response = await axios.post(`/Admin/categories/${selectedCategory}/subcategories`, {
        subCategoryName: subcategoryName
      });

      // Update state to reflect the new subcategory
      setCategories(categories.map(cat =>
        cat._id === selectedCategory
          ? { ...cat, subcategories: [...(cat.subcategories || []), response.data] }
          : cat
      ));
      setSubcategoryName('');
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  return (
    <div className="admin-category" style={mainStyle}>
      <div className="admin-category-container">
        <div className="header-container">
          <h1>Manage Categories</h1>
        </div>

        <div className="category-body-container">
          {/* Add Category Form */}
          <div className="form-section">
            <h2>Create New Category</h2>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn">Add Category</button>
            </form>
          </div>

          {/* Add Subcategory Form */}
          <div className="form-section">
            <h2>Create New Subcategory</h2>
            <form onSubmit={handleAddSubcategory}>
              <div className="form-group">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name} {/* Corrected category name */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subcategory Name"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  disabled={!selectedCategory}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={!selectedCategory}>
                Add Subcategory
              </button>
            </form>
          </div>

          {/* Display Categories and Subcategories */}
          <div className="categories-list">
            <h2>Current Categories</h2>
            {categories.length === 0 ? (
              <p>No categories added yet</p>
            ) : (
              <ul>
                {categories.map(category => (
                  <li key={category._id}>
                    <strong>{category.name}</strong> {/* Corrected category name */}
                    {category.subcategories?.length > 0 && (
                      <ul>
                        {category.subcategories.map((sub) => (
                          <li key={sub._id}>{sub.subCategoryName}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;
