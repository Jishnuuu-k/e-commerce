import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import './admindashboard.css';

function Admindashboard({ sidebarWidth }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    subcategory: '',
    images: [] 
  });

  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState({ form: false, categories: true });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

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

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      setFilteredSubcategories(category?.subcategories || []);
    } else {
      setFilteredSubcategories([]);
    }
    setProductData(prev => ({ ...prev, subcategory: '' }));
  }, [selectedCategory, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
    setProductData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, form: true }));
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("subcategory", productData.subcategory);

      productData.images.forEach((image, index) => {
        formData.append(`images`, image); 
      });

      const response = await axios.post('/Admin/products', formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Product added successfully!');
      setProductData({ name: '', description: '', price: '', stock: '', subcategory: '', images: [] });
      setSelectedCategory('');
      setImagePreviews([]);
    } catch (error) {
      console.log('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(prev => ({ ...prev, form: false }));
    }
  };

  return (
    <div className="admin-container" style={{ marginLeft: `${sidebarWidth}px` }}>
      <div className="admin-content">
        <h2 className="admin-title">Add New Product</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {loading.categories ? (
          <div className="loading-spinner">Loading categories...</div>
        ) : (
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="select-dropdown"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subcategory">Subcategory</label>
                <select
                  id="subcategory"
                  name="subcategory"
                  value={productData.subcategory}
                  onChange={handleChange}
                  className="select-dropdown"
                  required
                  disabled={!selectedCategory}
                >
                  <option value="">Select Subcategory</option>
                  {filteredSubcategories.map(sub => (
                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Enter detailed product description"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="images">Product Images</label>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    className="file-upload-input"
                  />
                  <label htmlFor="images" className="file-upload-label">
                    <span className="file-upload-button">Choose Files</span>
                    <span className="file-upload-text">
                      {productData.images.length > 0 
                        ? `${productData.images.length} file(s) selected` 
                        : 'No files selected'}
                    </span>
                  </label>
                </div>
                
                {imagePreviews.length > 0 && (
                  <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="image-preview">
                        <img src={preview} alt={`Preview ${index}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading.form}
            >
              {loading.form ? (
                <>
                  <span className="spinner"></span> Adding Product...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Admindashboard;