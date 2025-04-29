import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AppContext";
import "./header.css";

// We'll handle the Sidebar import differently
import Sidebar from "../Sidebar/Sidebar";

function Header() {
  const { authToken, user } = useContext(AuthContext);
  
  // States
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Refs for handling click outside dropdowns
  const authDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setShowAuthDropdown(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.42,0-8-3.58-8-8 c0-4.42,3.58-8,8-8s8,3.58,8,8C20,16.42,16.42,20,12,20z"/>
                <path d="M16.5,11c-0.83,0-1.5-0.67-1.5-1.5S15.67,8,16.5,8S18,8.67,18,9.5S17.33,11,16.5,11z"/>
                <path d="M7.5,11C6.67,11,6,10.33,6,9.5S6.67,8,7.5,8S9,8.67,9,9.5S8.33,11,7.5,11z"/>
                <path d="M12,17.5c-2.33,0-4.31-1.46-5.11-3.5h10.22C16.31,16.04,14.33,17.5,12,17.5z"/>
              </svg>
            </div>
            <h1 className="logo-text">MOTO<span>HUB</span></h1>
          </Link>
        </div>
        
        {/* Mobile hamburger button */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Main navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            
            {/* Categories Dropdown */}
            <li className="nav-item dropdown" ref={categoriesDropdownRef}>
              <button 
                className="nav-link dropdown-toggle"
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              >
                Categories
                <svg className={`dropdown-icon ${showCategoriesDropdown ? 'rotate' : ''}`} viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
              
              {showCategoriesDropdown && (
                <div className="dropdown-menu categories-dropdown">
                  <Link to="/category/sport" className="dropdown-item" onClick={() => {handleLinkClick(); setShowCategoriesDropdown(false)}}>
                    Sport Bikes
                  </Link>
                  <Link to="/category/cruiser" className="dropdown-item" onClick={() => {handleLinkClick(); setShowCategoriesDropdown(false)}}>
                    Cruisers
                  </Link>
                  <Link to="/category/adventure" className="dropdown-item" onClick={() => {handleLinkClick(); setShowCategoriesDropdown(false)}}>
                    Adventure
                  </Link>
                  <Link to="/category/touring" className="dropdown-item" onClick={() => {handleLinkClick(); setShowCategoriesDropdown(false)}}>
                    Touring
                  </Link>
                  <Link to="/category/offroad" className="dropdown-item" onClick={() => {handleLinkClick(); setShowCategoriesDropdown(false)}}>
                    Off-Road
                  </Link>
                </div>
              )}
            </li>
            
            <li className="nav-item">
              <Link to="/products" className="nav-link" onClick={handleLinkClick}>
                Products
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={handleLinkClick}>
                About
              </Link>
            </li>
          </ul>
          
          {/* User actions */}
          <div className="user-actions">
            {authToken ? (
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/my-orders" className="nav-link" onClick={handleLinkClick}>
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                    My Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link" onClick={handleLinkClick}>
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link cart-link" onClick={handleLinkClick}>
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    Cart
                    <span className="cart-count">0</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="auth-dropdown" ref={authDropdownRef}>
                <button 
                  className="auth-toggle"
                  onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                >
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  Account
                  <svg className={`dropdown-icon ${showAuthDropdown ? 'rotate' : ''}`} viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                
                {showAuthDropdown && (
                  <div className="dropdown-menu auth-menu">
                    <Link to="/login" className="dropdown-item" onClick={() => {handleLinkClick(); setShowAuthDropdown(false)}}>
                      <svg className="icon" viewBox="0 0 24 24">
                        <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
                      </svg>
                      Sign In
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={() => {handleLinkClick(); setShowAuthDropdown(false)}}>
                      <svg className="icon" viewBox="0 0 24 24">
                        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;