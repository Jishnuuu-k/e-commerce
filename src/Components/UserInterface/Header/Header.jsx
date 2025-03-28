import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AppContext";
import "./header.css";

// Import a nice font (add this to your main CSS file)
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Racing+Sans+One&display=swap');

function Header() {
  const { authToken, user,  } = useContext(AuthContext);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navigation-bar">
      {/* Logo Section */}
      <div className="nav-logo">
        <Link to="/">
          <div className="logo-container">
            <svg className="logo-icon" viewBox="0 0 24 24">
            </svg>
            <h2 className="logo-text">MOTO HUB</h2>
          </div>
        </Link>
      </div>
      
      {/* Desktop Navigation */}
      <nav className={`nav-options ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <Link to="/" className="nav-link">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/about" className="nav-link">
          <i className="fas fa-info-circle"></i> About
        </Link>
        <Link to="/products" className="nav-link">
          <i className="fas fa-motorcycle"></i> Products
        </Link>
        
        {authToken ? (
          <>
            <Link to="/profile" className="nav-link">
              <i className="fas fa-user-circle"></i> Profile
            </Link>
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart"></i> Cart
              <span className="cart-badge">0</span>
            </Link>
          </>
        ) : (
          <div className="auth-dropdown-container">
            <button 
              className="auth-toggle"
              onClick={() => setShowAuthDropdown(!showAuthDropdown)}
            >
              <i className="fas fa-user"></i> Account
              <i className={`fas fa-chevron-${showAuthDropdown ? "up" : "down"}`}></i>
            </button>
            
            {showAuthDropdown && (
              <div className="auth-dropdown">
                <Link to="/login" onClick={() => setShowAuthDropdown(false)} className="dropdown-link">
                  <i className="fas fa-sign-in-alt"></i> Sign In
                </Link>
                <Link to="/register" onClick={() => setShowAuthDropdown(false)} className="dropdown-link">
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      
      {/* Mobile Hamburger Menu */}
      <button 
        className="hamburger-menu" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <div className={`hamburger-line ${mobileMenuOpen ? 'line1' : ''}`}></div>
        <div className={`hamburger-line ${mobileMenuOpen ? 'line2' : ''}`}></div>
        <div className={`hamburger-line ${mobileMenuOpen ? 'line3' : ''}`}></div>
      </button>
    </header>
  );
}

export default Header;