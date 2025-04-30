import React, { useState, useEffect } from 'react';
import axios from '../../../../Axios/Axios';
import './myorders.css';

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/myorders');
        setOrders(response.data.Myorders);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="myorders-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your gear...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="myorders-container">
        <div className="error-container">
          <h3>Oops!</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="myorders-container">
      <div className="myorders-header">
        <h1>YOUR <span className="accent">ORDERS</span></h1>
        <div className="order-count">
          <span className="count-number">{orders.length}</span>
          <span className="count-text">ITEMS</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders yet</h2>
          <p>Time to gear up! Browse our collection and find something awesome.</p>
          <button className="shop-now-btn">SHOP NOW</button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-image-container">
                <img 
                  src={order.images[0]?.url || '/placeholder.png'} 
                  alt={order.name} 
                  className="order-image" 
                />
                <div className="quantity-badge">{order.Itemquantity}</div>
              </div>
              <div className="order-info">
                <h3 className="order-name">{order.name}</h3>
                <div className="order-price-container">
                  <span className="order-price">₹{order.price}</span>
                  <button className="reorder-btn">REORDER</button>
                </div>
                <div className="order-actions">
                  <button className="action-btn track-btn">TRACK</button>
                  <button className="action-btn review-btn">REVIEW</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Myorders;