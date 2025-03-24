import React, { useState, useEffect } from 'react';
import './admindashboard.css';

function AddProduct({ sidebarWidth }) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    description: '',
    price: '',
    categoryId: '',
    subCategoryId: '',
    stock: 1,
    image: ''
  });
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', message: '' });

  // Fetch categories on component mount
  useEffect(() => {
    // Replace with your actual API endpoint
    const fetchCategories = async () => {
      try {
        // Simulated data - replace with actual API call
        const data = [
          { _id: '1', name: 'Electronics' },
          { _id: '2', name: 'Clothing' },
          { _id: '3', name: 'Home & Kitchen' }
        ];
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setFormData({ ...formData, categoryId, subCategoryId: '' });
    
    if (!categoryId) {
      setSubCategories([]);
      return;
    }
    
    try {
      // Simulated data - replace with actual API call
      const data = categoryId === '1' 
        ? [{ _id: '101', name: 'Phones' }, { _id: '102', name: 'Laptops' }]
        : categoryId === '2'
        ? [{ _id: '201', name: 'Men' }, { _id: '202', name: 'Women' }]
        : [{ _id: '301', name: 'Furniture' }, { _id: '302', name: 'Appliances' }];
      
      setSubCategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.productId) errors.productId = 'Product ID is required';
    if (!formData.productName) errors.productName = 'Product name is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.price) errors.price = 'Price is required';
    else if (isNaN(formData.price) || Number(formData.price) <= 0) 
      errors.price = 'Price must be a positive number';
    if (!formData.categoryId) errors.categoryId = 'Category is required';
    if (!formData.subCategoryId) errors.subCategoryId = 'Subcategory is required';
    if (!formData.stock) errors.stock = 'Stock is required';
    else if (isNaN(formData.stock) || Number(formData.stock) < 0) 
      errors.stock = 'Stock must be a non-negative number';
    if (!formData.image) errors.image = 'Product image is required';
    
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setFormErrors(errors);
    
    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Create FormData object for file upload
        const productData = new FormData();
        for (const key in formData) {
          productData.append(key, formData[key]);
        }
        
        // Replace with your actual API endpoint
        // const response = await fetch('/api/products', {
        //   method: 'POST',
        //   body: productData
        // });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSubmitMessage({
          type: 'success',
          message: 'Product added successfully!'
        });
        
        // Reset form
        setFormData({
          productId: '',
          productName: '',
          description: '',
          price: '',
          categoryId: '',
          subCategoryId: '',
          stock: 1,
          image: ''
        });
        setImagePreview(null);
        
      } catch (error) {
        console.error('Error adding product:', error);
        setSubmitMessage({
          type: 'error',
          message: 'Failed to add product. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
        // Clear message after 5 seconds
        setTimeout(() => setSubmitMessage({ type: '', message: '' }), 5000);
      }
    }
  };

  // Main style with dynamic sidebar adjustment
  const mainStyle = {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

  return (
    <div className="add-product-container" style={mainStyle}>
      <div className="add-product-content">
        <h2>Add New Product</h2>
        
        {submitMessage.message && (
          <div className={`message ${submitMessage.type}`}>
            {submitMessage.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="productId">Product ID *</label>
              <input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                placeholder="Enter unique product ID"
              />
              {formErrors.productId && <span className="error">{formErrors.productId}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="productName">Product Name *</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
              />
              {formErrors.productName && <span className="error">{formErrors.productName}</span>}
            </div>
            
            <div className="form-group span-2">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
              />
              {formErrors.description && <span className="error">{formErrors.description}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                min="0"
                step="0.01"
              />
              {formErrors.price && <span className="error">{formErrors.price}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter available stock"
                min="0"
              />
              {formErrors.stock && <span className="error">{formErrors.stock}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="categoryId">Category *</label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formErrors.categoryId && <span className="error">{formErrors.categoryId}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="subCategoryId">Subcategory *</label>
              <select
                id="subCategoryId"
                name="subCategoryId"
                value={formData.subCategoryId}
                onChange={handleChange}
                disabled={!formData.categoryId}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {formErrors.subCategoryId && <span className="error">{formErrors.subCategoryId}</span>}
            </div>
            
            <div className="form-group span-2">
              <label htmlFor="image">Product Image *</label>
              <div className="image-upload-container">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Product preview" />
                  </div>
                )}
              </div>
              {formErrors.image && <span className="error">{formErrors.image}</span>}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-cancel">Cancel</button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;