import React, { useState, useEffect } from 'react';
import './admincategory.css';

function Admincategory({ sidebarWidth }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state for adding new category
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    subcategories: [{ subCategoryName: '' }]
  });
  
  // State for editing mode
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  
  // Notification state
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // Function to fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('/api/categories');
      // const data = await response.json();
      
      // Simulated data
      await new Promise(resolve => setTimeout(resolve, 800));
      const data = [
        {
          _id: '1',
          categoryName: 'Electronics',
          subcategories: [
            { _id: 'sub1', subCategoryName: 'Phones' },
            { _id: 'sub2', subCategoryName: 'Laptops' },
            { _id: 'sub3', subCategoryName: 'Accessories' }
          ]
        },
        {
          _id: '2',
          categoryName: 'Clothing',
          subcategories: [
            { _id: 'sub4', subCategoryName: 'Men' },
            { _id: 'sub5', subCategoryName: 'Women' },
            { _id: 'sub6', subCategoryName: 'Kids' }
          ]
        }
      ];
      
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories. Please try again later.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle category name input change
  const handleCategoryNameChange = (e) => {
    setNewCategory({
      ...newCategory,
      categoryName: e.target.value
    });
  };
  
  // Handle subcategory name input change
  const handleSubcategoryChange = (index, e) => {
    const updatedSubcategories = [...newCategory.subcategories];
    updatedSubcategories[index] = { subCategoryName: e.target.value };
    
    setNewCategory({
      ...newCategory,
      subcategories: updatedSubcategories
    });
  };
  
  // Add a new subcategory input field
  const addSubcategoryField = () => {
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, { subCategoryName: '' }]
    });
  };
  
  // Remove a subcategory input field
  const removeSubcategoryField = (index) => {
    const updatedSubcategories = [...newCategory.subcategories];
    updatedSubcategories.splice(index, 1);
    
    setNewCategory({
      ...newCategory,
      subcategories: updatedSubcategories
    });
  };
  
  // Reset form to default state
  const resetForm = () => {
    setNewCategory({
      categoryName: '',
      subcategories: [{ subCategoryName: '' }]
    });
    setEditMode(false);
    setEditCategoryId(null);
  };
  
  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newCategory.categoryName.trim()) {
      showNotification('error', 'Category name is required');
      return;
    }
    
    // Filter out empty subcategories
    const filteredSubcategories = newCategory.subcategories.filter(
      subcategory => subcategory.subCategoryName.trim() !== ''
    );
    
    if (filteredSubcategories.length === 0) {
      showNotification('error', 'At least one subcategory is required');
      return;
    }
    
    const categoryData = {
      ...newCategory,
      subcategories: filteredSubcategories
    };
    
    try {
      if (editMode) {
        // Update existing category
        // Replace with your actual API endpoint
        // await fetch(`/api/categories/${editCategoryId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(categoryData)
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update local state
        setCategories(categories.map(category => 
          category._id === editCategoryId 
            ? { ...category, ...categoryData, _id: editCategoryId }
            : category
        ));
        
        showNotification('success', 'Category updated successfully');
      } else {
        // Create new category
        // Replace with your actual API endpoint
        // const response = await fetch('/api/categories', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(categoryData)
        // });
        // const newCategoryData = await response.json();
        
        // Simulate API call and response
        await new Promise(resolve => setTimeout(resolve, 500));
        const newCategoryData = {
          ...categoryData,
          _id: Math.random().toString(36).substr(2, 9),
          subcategories: categoryData.subcategories.map(sub => ({
            ...sub,
            _id: Math.random().toString(36).substr(2, 9)
          }))
        };
        
        // Update local state
        setCategories([...categories, newCategoryData]);
        
        showNotification('success', 'Category added successfully');
      }
      
      // Reset form
      resetForm();
    } catch (err) {
      showNotification('error', `Failed to ${editMode ? 'update' : 'add'} category`);
      console.error(`Error ${editMode ? 'updating' : 'adding'} category:`, err);
    }
  };
  
  // Handle edit category
  const handleEditCategory = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setNewCategory({
      categoryName: category.categoryName,
      subcategories: [...category.subcategories]
    });
  };
  
  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      // Replace with your actual API endpoint
      // await fetch(`/api/categories/${categoryId}`, {
      //   method: 'DELETE'
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setCategories(categories.filter(category => category._id !== categoryId));
      
      showNotification('success', 'Category deleted successfully');
    } catch (err) {
      showNotification('error', 'Failed to delete category');
      console.error('Error deleting category:', err);
    }
  };
  
  // Main style with dynamic sidebar adjustment
  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };
  
  return (
    <div className="admin-category-container" style={mainStyle}>
      <div className="admin-category-content">
        <h2>{editMode ? 'Edit Category' : 'Add New Category'}</h2>
        
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        
        <div className="admin-category-form-container">
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                placeholder="Enter category name"
                value={newCategory.categoryName}
                onChange={handleCategoryNameChange}
                required
              />
            </div>
            
            <div className="subcategories-container">
              <div className="subcategories-header">
                <h3>Subcategories</h3>
                <button 
                  type="button" 
                  className="add-subcategory-btn"
                  onClick={addSubcategoryField}
                >
                  + Add Subcategory
                </button>
              </div>
              
              {newCategory.subcategories.map((subcategory, index) => (
                <div key={index} className="subcategory-row">
                  <input
                    type="text"
                    placeholder="Enter subcategory name"
                    value={subcategory.subCategoryName}
                    onChange={(e) => handleSubcategoryChange(index, e)}
                  />
                  {newCategory.subcategories.length > 1 && (
                    <button 
                      type="button" 
                      className="remove-subcategory-btn"
                      onClick={() => removeSubcategoryField(index)}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {editMode ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="categories-list-container">
          <h2>Categories</h2>
          
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : categories.length === 0 ? (
            <div className="empty-message">No categories found</div>
          ) : (
            <div className="categories-list">
              {categories.map((category) => (
                <div key={category._id} className="category-card">
                  <div className="category-card-header">
                    <h3>{category.categoryName}</h3>
                    <div className="category-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="subcategories-list">
                    <h4>Subcategories:</h4>
                    <ul>
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory._id || subcategory.subCategoryName}>
                          {subcategory.subCategoryName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admincategory;