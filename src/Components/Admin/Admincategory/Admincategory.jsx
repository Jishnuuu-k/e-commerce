import React, { useState, useEffect } from 'react';
import axios from '../../../../Axios/Axios'; // Import axios instance
import './admincategory.css'; // Import CSS for styling

function AdminCategory({ sidebarWidth }) {
  const [categories, setCategories] = useState([]); 
  const [name, setName] = useState('');
  const [subcategoryName, setSubcategoryName] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(''); 

  // Dynamic styles for main container based on sidebar width
  const mainStyle = {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/Admin/get/categories'); // GET request to fetch categories
        setCategories(response.data.response); // Update state with fetched categories
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Add new category to the database
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await axios.post('/Admin/category', { name }); // POST request to add category
      setCategories([...categories, response.data.category]); // Update state with new category
      setName(''); // Reset input field
      alert('Category created successfully')
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Add new subcategory to the selected category
  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!subcategoryName.trim() || !selectedCategory) return;

    try {
      const response = await axios.post(`/admin/categories/${selectedCategory}/subcategories`, {
        name: subcategoryName // Ensure backend expects "name" for subcategory
        
      });

      // Update state to include new subcategory
      setCategories(categories.map(cat =>
        cat._id === selectedCategory
          ? { ...cat, subcategories: [...(cat.subcategories || []), response.data.subcategory] }
          : cat
      ));
      setSubcategoryName('');
      alert('Sub category added successfully')
    } catch (error) {
      console.log("Error adding subcategory:", error);
    }
  };

  return (
    <div className="admin-category" style={mainStyle}>
      <div className="admin-category-container">
        <h1>Manage Categories</h1>

        {/* Form to Add Category */}
        <div className="form-section">
          <h2>Create New Category</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">Add Category</button>
          </form>
        </div>

        {/* Form to Add Subcategory */}
        <div className="form-section">
          <h2>Create New Subcategory</h2>
          <form onSubmit={handleAddSubcategory}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Subcategory Name"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              disabled={!selectedCategory}
            />
            <button type="submit" disabled={!selectedCategory}>Add Subcategory</button>
          </form>
        </div>


      </div>
    </div>
  );
}

export default AdminCategory;
