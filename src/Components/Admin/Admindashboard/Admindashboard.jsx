import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import './admindashboard.css';

function Admindashboard({ sidebarWidth }) {
  // State to manage product data
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    subcategory: '',
    images: [] // Holds selected image files
  });

  const [categories, setCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState({ form: false, categories: true });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get token from localStorage for authentication
  const token = localStorage.getItem('token');

  // Set default headers for Axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch categories on component mount
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

  // Update filtered subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      setFilteredSubcategories(category?.subcategories || []);
    } else {
      setFilteredSubcategories([]);
    }
    setProductData(prev => ({ ...prev, subcategory: '' }));
  }, [selectedCategory, categories]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
    setProductData(prev => ({ ...prev, images: files }));
  };

  // Handle form submission
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

      // Append each selected image
      productData.images.forEach(image => {
        formData.append("images", image);
      });

      // Send the request
      const response = await axios.post('/Admin/products', formData, {
        headers: { "Content-Type": "multipart/form-data" }
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
    <div style={{ marginLeft: `${sidebarWidth}px`, padding: '2rem' }}>
      <h2>Add New Product</h2>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {loading.categories ? <div className="loading">Loading categories...</div> : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" required />
          <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Description" required />
          <input type="number" name="price" value={productData.price} onChange={handleChange} placeholder="Price" required />
          <input type="number" name="stock" value={productData.stock} onChange={handleChange} placeholder="Stock" required />

          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
          </select>

          <select name="subcategory" value={productData.subcategory} onChange={handleChange} required>
            <option value="">Select Subcategory</option>
            {filteredSubcategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
          </select>

          <input type="file" name="images" onChange={handleImageChange} multiple accept="image/*" />

          <button type="submit" disabled={loading.form}>{loading.form ? 'Adding...' : 'Add Product'}</button>
        </form>
      )}
    </div>
  );
}

export default Admindashboard;
