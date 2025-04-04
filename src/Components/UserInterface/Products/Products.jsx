import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import './product.css';

function Products({ sidebarWidth }) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/Users/all/categories");
        setCategories(response.data.response);
        groupProductsBySubcategory(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      groupProductsBySubcategory(categories);
    } else {
      const filtered = categories.map(category => ({
        ...category,
        subcategories: category.subcategories.map(subcategory => ({
          ...subcategory,
          products: subcategory.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(subcategory => subcategory.products.length > 0)
      })).filter(category => category.subcategories.length > 0);
      
      setGroupedProducts(filtered);
    }
  }, [searchTerm, categories]);

  const groupProductsBySubcategory = (categoriesData) => {
    setGroupedProducts(categoriesData.filter(cat => cat.subcategories.some(sub => sub.products.length > 0)));
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    padding: '20px'
  };

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const handleBuyNow = (product) => {
    console.log("Buy now:", product);
  };

  return (
    <div className="product-view" style={mainStyle}>
      <div className="product-search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="product-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {groupedProducts.length > 0 ? (
        <div className="category-container">
          {groupedProducts.map(category => (
            <div key={category._id} className="category-section">
              <h2 className="category-title">{category.name}</h2>
              <p className="category-description">{category.description}</p>
              
              {category.subcategories.map(subcategory => (
                <div key={subcategory._id} className="subcategory-section">
                  <h3 className="subcategory-title">{subcategory.name}</h3>
                  <p className="subcategory-description">{subcategory.description}</p>
                  
                  <div className="product-grid">
                    {subcategory.products.map(product => (
                      <div key={product._id} className="product-card">
                        <div className="product-image-container">
                          {product.images.length > 0 && (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name} 
                              className="product-image"
                            />
                          )}
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-description">{product.description}</p>
                          <p className="product-price">₹{product.price}</p>
                          <p className="product-stock">
                            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                          </p>
                        </div>
                        <div className="product-actions">
                          <button 
                            className="buy-now-btn"
                            onClick={() => handleBuyNow(product)}
                          >
                            Buy Now
                          </button>
                          <button 
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          {searchTerm ? 
            'No products match your search.' : 
            'No products available.'}
        </div>
      )}
    </div>
  );
}

export default Products;