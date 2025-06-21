import React, { useContext, useState } from 'react';
import axios from '../../../../Axios/Axios';
import { AuthContext } from '../../../AppContext';
import './myorders.css';

function Myorders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLoadOrders = async () => {
    try {
      setLoading(true);
     const response = await axios.post('/users/myorders', { Username: user.Username });
      setOrders(response.data.Myorders); 
      setLoading(false);
    } catch (error) {
      console.error('Error loading orders:', error);
      setLoading(false);
    }
  };

  return (
    <div className="orders-page-container">
      {/* Orders Header Section */}
      <div className="orders-header-section">
        <div className="header-content">
          <h1 className="header-title">
            <span className="title-primary">My</span>
            <span className="title-secondary">ORDERS</span>
          </h1>
          <div className="header-subtitle">
            Track your premium purchases
          </div>
          <div className="header-glow"></div>
        </div>
      </div>

      {/* Load Orders Section */}
      <div className="orders-load-section">
        <button 
          className={`orders-load-button ${loading ? 'loading' : ''}`} 
          onClick={handleLoadOrders}
          disabled={loading}
        >
          <span className="load-button-content">
            {loading ? (
              <>
                <div className="orders-loading-spinner"></div>
                <span>LOADING ORDERS...</span>
              </>
            ) : (
              <>
                <span>LOAD YOUR ORDERS</span>
                <div className="load-button-arrow">→</div>
              </>
            )}
          </span>
          <div className="load-button-glow"></div>
        </button>
      </div>

      {/* Orders Display Section */}
      {orders.length > 0 && (
        <div className="orders-display-section">
          <div className="orders-section-header">
            <h2 className="orders-section-title">Your Orders</h2>
            <div className="orders-items-count">{orders.length} Items</div>
          </div>
          
          <div className="orders-items-grid">
            {orders.map((order, index) => (
              <div key={order._id} className="order-item-card" style={{'--delay': `${index * 0.1}s`}}>
                <div className="order-card-inner">
                  <div className="order-image-section">
                    <img 
                      src={order.images[0]?.url || 'https://via.placeholder.com/300x200?text=No+Image'} 
                      alt={order.name} 
                      className="order-item-image" 
                    />
                    <div className="order-image-overlay">
                      <div className="image-overlay-content">
                        <span className="overlay-view-text"></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-details-section">
                    <h3 className="order-item-name">{order.name}</h3>
                    
                    <div className="order-item-meta">
                      <div className="order-price-section">
                        <span className="order-price-label">PRICE</span>
                        <span className="order-price-value">₹{order.price?.toLocaleString()}</span>
                      </div>
                      
                      <div className="order-quantity-section">
                        <span className="order-quantity-label">QTY</span>
                        <span className="order-quantity-value">{order.Itemquantity}</span>
                      </div>
                    </div>
                    
                    <div className="order-card-actions">
                      <button className="order-action-btn order-track-btn">
                        <span>TRACK ORDER</span>
                      </button>
                      <button className="order-action-btn order-reorder-btn">
                        <span>REORDER</span>
                      </button>
                    </div>
                    
                    <div className="order-status-indicator">
                      <div className="order-status-dot"></div>
                      <span className="order-status-text">DELIVERED</span>
                    </div>
                  </div>
                </div>
                
                <div className="order-card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty Orders State */}
      {orders.length === 0 && !loading && (
        <div className="orders-empty-state">
          <div className="empty-state-icon">📦</div>
          <h3 className="empty-state-title">No Orders Found</h3>
          <p className="empty-state-subtitle">Load your orders to see your purchase history</p>
        </div>
      )}
    </div>
  );
}

export default Myorders;