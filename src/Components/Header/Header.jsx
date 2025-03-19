import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './header.css';

function Header() {
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo
  const [cartCount, setCartCount] = useState(2); // Example cart count
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const toggleShopDropdown = (e) => {
    e.stopPropagation();
    setShowShopDropdown(!showShopDropdown);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
    if (showShopDropdown) setShowShopDropdown(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
    // Close dropdowns when toggling mobile menu
    setShowShopDropdown(false);
    setShowProfileDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.dropdown') && !e.target.closest('.profile-container')) {
        setShowShopDropdown(false);
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('click', closeDropdowns);
    
    return () => {
      document.removeEventListener('click', closeDropdowns);
    };
  }, []);

  // Prevent scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuActive]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>CharmCrafts</h1>
          <span className="tagline">Handmade with love</span>
        </div>

        <div className={`overlay ${mobileMenuActive ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
        
        <nav className={`navbar ${mobileMenuActive ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item dropdown">
              <button 
                className="dropdown-toggle" 
                onClick={toggleShopDropdown}
              >
                Shop
              </button>
              <ul className={`dropdown-menu ${showShopDropdown ? 'show' : ''}`}>
                <li><a href="/shop/miniatures">Miniatures</a></li>
                <li><a href="/shop/keychains">Keychains</a></li>
                <li><a href="/shop/jewelry">Jewelry</a></li>
                <li><a href="/shop/custom">Custom Orders</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">About Us</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact</a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a href="/orders" className="nav-link">My Orders</a>
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
              {isLoggedIn ? 'Profile' : 'Login'}
            </button>
            <div className={`profile-dropdown ${showProfileDropdown ? 'show' : ''}`}>
              {isLoggedIn ? (
                <>
                  <a href="/profile">My Profile</a>
                  <a href="/settings">Account Settings</a>
                  <button onClick={() => setIsLoggedIn(false)}>Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login">Sign In</Link>
                  <Link to="/register">Create Account</Link>
                </>
              )}
            </div>
          </div>

          <a href="/cart" className="cart-button">
            Cart
            <span className="cart-count">{cartCount}</span>
          </a>
        </div>
        
        <button 
          className={`hamburger ${mobileMenuActive ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;