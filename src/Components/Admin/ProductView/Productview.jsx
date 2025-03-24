import React, { useState } from 'react';
import './productview.css';

function Productview({ sidebarWidth }) {
  // Sample product data - replace with your actual data source
  const [products, setProducts] = useState([
    { id: 1, name: 'Smartphone', price: 799, category: 'Electronics', image: '/api/placeholder/150/150' },
    { id: 2, name: 'Laptop', price: 1299, category: 'Electronics', image: '/api/placeholder/150/150' },
    { id: 3, name: 'Headphones', price: 199, category: 'Accessories', image: '/api/placeholder/150/150' },
    { id: 4, name: 'Smart Watch', price: 299, category: 'Wearables', image: '/api/placeholder/150/150' },
    { id: 5, name: 'Tablet', price: 499, category: 'Electronics', image: '/api/placeholder/150/150' },
    { id: 6, name: 'Bluetooth Speaker', price: 129, category: 'Audio', image: '/api/placeholder/150/150' },
  ]);

  // Handle edit function
  const handleEdit = (id) => {
    console.log('Editing product with id:', id);
    // Implement your edit logic here
  };

  // Handle delete function
  const handleDelete = (id) => {
    console.log('Deleting product with id:', id);
    // Implement your delete logic or show confirmation dialog
    setProducts(products.filter(product => product.id !== id));
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };
  return (
    <div className="product-container" style={mainStyle}>
      <h2>Product List</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="hover-actions">
                <button 
                  className="edit-btn" 
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productview;