import React, { useState } from 'react';
import './header.css';

function Header() {
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo
  const [cartCount, setCartCount] = useState(2); // Example cart count

  const toggleShopDropdown = () => {
    setShowShopDropdown(!showShopDropdown);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    if (showShopDropdown) setShowShopDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>CharmCrafts</h1>
          <span className="tagline">Handmade with love</span>
        </div>

        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="/" className="nav-link">
                <span className="icon">🏠</span> Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <button 
                className="nav-link dropdown-toggle" 
                onClick={toggleShopDropdown}
              >
                <span className="icon">🛍️</span> Shop
              </button>
              <ul className={`dropdown-menu ${showShopDropdown ? 'show' : ''}`}>
                <li><a href="/shop/miniatures">Miniatures</a></li>
                <li><a href="/shop/keychains">Keychains</a></li>
                <li><a href="/shop/jewelry">Jewelry</a></li>
                <li><a href="/shop/custom">Custom Orders</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">
                <span className="icon">🎨</span> About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">
                <span className="icon">📩</span> Contact
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a href="/orders" className="nav-link">
                  <span className="icon">📦</span> My Orders
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="profile-container">
            <button 
              className="profile-button" 
              onClick={toggleProfileDropdown}
            >
              <span className="icon">{isLoggedIn ? '👤' : '🔐'}</span>
              {isLoggedIn ? 'Profile' : 'Login'}
            </button>
            <div className={`profile-dropdown ${showProfileDropdown ? 'show' : ''}`}>
              {isLoggedIn ? (
                <>
                  <a href="/profile">My Profile</a>
                  <a href="/settings">Settings</a>
                  <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                </>
              ) : (
                <>
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
                </>
              )}
            </div>
          </div>

          <a href="/cart" className="cart-button">
            <span className="icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;