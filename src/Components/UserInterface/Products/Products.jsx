import React, { useState, useEffect } from 'react';
import axios from "../../../../Axios/Axios";
import { useContext } from "react";
import { AuthContext } from "../../../AppContext";
import './product.css';

function Products({ sidebarWidth }) {
  const [categories, setCategories] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/Users/all/categories");
        setCategories(response.data.response);
        console.log(response.data.response);
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
      console.log("Purchase successful. Total amount:", total);
      
    } catch (error) {
      console.log(error);
    }
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
    padding: '20px',
  };

  return (
    <div className="product-view" style={mainStyle}>
      {categories.map((category) => (
        <div key={category._id} className="category-section">
          <h2>{category.name}</h2>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory._id} className="subcategory-section">
              <h3>{subcategory.name}</h3>
              <div className="products-container">
                {subcategory.products.map((product) => (
                  <div key={product._id} className="product-card">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="product-image"
                    />
                    <h4>{product.name}</h4>
                    <p>₹{product.price}</p>
                    <select
                      value={quantities[product._id] || 1}
                      onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                      className="quantity-select"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                    <div className="product-buttons">
                      <button
                        className="btn add-to-cart"
                        onClick={() => handleSubmit(product, "addtocart")}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn buy-now"
                        onClick={() => handleSubmit(product, "buynow")}
                      >
                        Buy Now
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
  );
}

export default Products;
