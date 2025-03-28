import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Yamaha R15 V4',
      price: 182800,
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fz-x-right-front-three-quarter-2.jpeg',
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: 'Royal Enfield Classic 350',
      price: 193080,
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scram-411-right-front-three-quarter-4.jpeg',
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: 'KTM Duke 200',
      price: 215635,
      image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/147821/duke-200-right-front-three-quarter-2.jpeg',
      quantity: 1,
      inStock: false
    }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 500;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Moto Hub Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png" alt="Empty cart" />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything to your cart yet</p>
              <Link to="/products" className="shop-btn">Shop Now</Link>
            </div>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    {!item.inStock && <span className="out-of-stock">Out of Stock</span>}
                    <div className="price">₹{item.price.toLocaleString('en-IN')}</div>
                    <div className="item-actions">
                      <div className="quantity-selector">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;