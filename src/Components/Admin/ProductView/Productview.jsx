import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import './ProductView.css';

function ProductView({ sidebarWidth }) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    setIsLoading(true);
    axios.get("/Admin/get/categories")
      .then(response => {
        setCategories(response.data.response || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("Error fetching categories:", error);
        setIsLoading(false);
      });
  }, []);

  // Fetch subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat._id === selectedCategory);
      setSubcategories(category?.subcategories || []);
      setSelectedSubcategory('');
      setProducts([]);
    }
  }, [selectedCategory, categories]);

  // Fetch products when a subcategory is selected
  const handleFilter = () => {
    if (selectedSubcategory) {
      setIsLoading(true);
      axios.get(`/Admin/subcategories/${selectedSubcategory}/products`)
        .then(response => {
          setProducts(response.data.products || []);
          setIsLoading(false);
        })
        .catch(error => {
          console.log("Error fetching products:", error);
          setIsLoading(false);
        });
    }
  };

  const handleEdit = (id) => {
    console.log('Editing product with id:', id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log('Deleting product with id:', id);
      setProducts(products.filter(product => product._id !== id));
    }
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    padding: '20px'
  };

  return (
    <div className="product-view" style={mainStyle}>
      <div className="product-view__header">
        <h2 className="product-view__title">Product Management</h2>
        <p className="product-view__subtitle">Browse and manage your product inventory</p>
      </div>

      {/* Filter Section */}
      <div className="product-view__filters">
        <div className="product-filters">
          <div className="product-filters__group">
            <label htmlFor="category-select" className="product-filters__label">Category</label>
            <select 
              id="category-select"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="product-filters__select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className="product-filters__group">
            <label htmlFor="subcategory-select" className="product-filters__label">Subcategory</label>
            <select 
              id="subcategory-select"
              value={selectedSubcategory} 
              onChange={(e) => setSelectedSubcategory(e.target.value)} 
              disabled={!selectedCategory}
              className="product-filters__select"
            >
              <option value="">All Subcategories</option>
              {subcategories.map(sub => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleFilter} 
            disabled={!selectedSubcategory}
            className="product-filters__button"
          >
            {isLoading ? 'Loading...' : 'Filter Products'}
          </button>
        </div>
      </div>

      {/* Products Display */}
      {isLoading ? (
        <div className="product-view__loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="product-view__grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product._id}>
                <div className="product-card__image-container">
                  <img 
                    src={product.images?.length > 0 ? product.images[0].url : '/placeholder-product.jpg'} 
                    alt={product.name}
                    className="product-card__image"
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="product-card__actions">
                    <button 
                      className="product-card__button product-card__button--edit" 
                      onClick={() => handleEdit(product._id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button 
                      className="product-card__button product-card__button--delete" 
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className="fas fa-trash-alt"></i> Delete
                    </button>
                  </div>
                </div>
                <div className="product-card__details">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__meta">
                    <span className="product-card__price">${product.price?.toFixed(2)}</span>
                    <span className={`product-card__stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="product-view__empty">
              <i className="fas fa-box-open"></i>
              <p>No products found. Try changing your filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductView;