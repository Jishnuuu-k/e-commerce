import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import './admindashboard.css';

function Admindashboard({ sidebarWidth }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    subcategory: '', // This will store the _id of selected subcategory
    images: []
  });
  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState({
    form: false,
    categories: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const mainStyle = {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    padding: '2rem'
  };

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Configure axios to include the token in headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch categories and subcategories
  useEffect(() => {
    axios.get("/Admin/get/categories")
      .then(response => {
        setCategories(response.data.response || []);
      })
      .catch(err => {
        console.log("Error fetching categories:", err);
        setError("Failed to load categories");
      })
      .finally(() => {
        setLoading(prev => ({ ...prev, categories: false }));
      });
  }, []);

  // Filter subcategories when category is selected
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      setFilteredSubcategories(category?.subcategories || []);
    } else {
      setFilteredSubcategories([]);
    }
    // Reset subcategory selection when category changes
    setProductData(prev => ({ ...prev, subcategory: '' }));
  }, [selectedCategory, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(base64Images => {
      setProductData(prev => ({
        ...prev,
        images: base64Images
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, form: true }));
    setError('');
    setSuccess('');

    try {
      const dataToSend = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        // subcategory is already the _id
      };

      const response = await axios.post('/Admin/products', dataToSend);
      setSuccess('Product added successfully!');
      // Reset form
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: '',
        subcategory: '',
        images: []
      });
      setSelectedCategory('');
      setImagePreviews([]);
    } catch (err) {
      console.log('Error adding product:', err);
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(prev => ({ ...prev, form: false }));
    }
  };

  return (
    <div style={mainStyle} className="admin-product-form">
      <h2>Add New Product</h2>
      
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {loading.categories ? (
        <div className="loading">Loading categories...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Basic Product Info */}
          <div className="form-group">
            <label htmlFor="name">Product Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock*</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Filter by Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subcategory">Subcategory*</label>
              <select
                id="subcategory"
                name="subcategory"
                value={productData.subcategory}
                onChange={handleChange}
                required
                disabled={!selectedCategory}
              >
                <option value="">Select a subcategory</option>
                {filteredSubcategories.map(sub => (
                  <option key={sub._id} value={sub._id}>
                    {typeof sub === 'object' ? sub.name : sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="images">Product Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            
            {imagePreviews.length > 0 && (
              <div className="image-previews">
                {imagePreviews.map((preview, index) => (
                  <img 
                    key={index} 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    className="image-preview"
                  />
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading.form} 
            className="submit-btn"
          >
            {loading.form ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Admindashboard;