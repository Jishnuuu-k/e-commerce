import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import { useContext } from "react";
import { AuthContext } from "../../../AppContext";
import { ShoppingCart, AlertCircle, Heart, Zap, X, Grid, List } from 'lucide-react';
import "./product.css"

const Products = ({ sidebarWidth }) => {
  const [categories, setCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/Users/all/categories");
        setCategories(response.data.response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: parseInt(value) }));
  };

  const handleSubmit = async (product, actionType) => {
    try {
      const quantity = quantities[product._id] || 1;
      const response = await axios.post("/Users/purchase", {
        product,
        actionType,
        quantity,
        userId: user
      });
      
      const total = response.data.Total;
      
      // Show notification
      setNotification({
        message: actionType === "addtocart" 
          ? `Added ${quantity} ${product.name} to cart` 
          : `Purchasing ${quantity} ${product.name} for ₹${total}`,
        type: actionType === "addtocart" ? "cart" : "buy"
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Error processing your request",
        type: "error"
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
  };

  return (
    <div className="products-page" style={mainStyle}>
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            {notification.type === "cart" && <ShoppingCart size={20} />}
            {notification.type === "buy" && <Zap size={20} />}
            {notification.type === "error" && <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
          <button className="close-notification" onClick={() => setNotification(null)}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="products-header">
        <h1 className="header-title">PROD<span className="accent">UCTS</span></h1>
        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
            onClick={() => setViewMode('grid')}
          >
            <Grid size={20} />
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
            onClick={() => setViewMode('list')}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="products-container">
          {categories.map((category) => (
            category.subcategories.map((subcategory) => (
              subcategory.products && subcategory.products.length > 0 && (
                <div key={subcategory._id} className="subcategory-products">
                  <h2 className="subcategory-title">{subcategory.name}</h2>
                  <div className={`products-grid ${viewMode}`}>
                    {subcategory.products.map((product) => (
                      <div 
                        key={product._id} 
                        className={`product-card ${hoveredProduct === product._id ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <div className="product-image-container">
                          <img
                            src={product.images[0]?.url || "/api/placeholder/400/320"}
                            alt={product.name}
                            className="product-image"
                          />
                          <div className="product-quick-actions">
                            <button className="quick-action-btn wishlist">
                              <Heart size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <div className="product-price">₹{product.price}</div>
                          <div className="product-controls">
                            <div className="quantity-control">
                              <select
                                value={quantities[product._id] || 1}
                                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                                className="quantity-select"
                              >
                                {[1, 2, 3, 4, 5].map((qty) => (
                                  <option key={qty} value={qty}>{qty}</option>
                                ))}
                              </select>
                            </div>
                            <div className="product-buttons">
                              <button
                                className="btn cart-btn"
                                onClick={() => handleSubmit(product, "addtocart")}
                              >
                                <ShoppingCart size={16} />
                                <span>Cart</span>
                              </button>
                              <button
                                className="btn buy-btn"
                                onClick={() => handleSubmit(product, "buynow")}
                              >
                                <Zap size={16} />
                                <span>Buy</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;