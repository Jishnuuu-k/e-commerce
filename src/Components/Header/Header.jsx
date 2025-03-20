import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { RiShoppingBag2Fill } from 'react-icons/ri';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Demo toggle login function (replace with your actual auth logic)
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Handle scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <RiShoppingBag2Fill className="logo-icon" />
          <span className="logo-text">ShopHub</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <ul className="nav-menu">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/shop" className="nav-link">Shop</Link></li>
            <li><Link to="/about" className="nav-link">About Us</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>

        {/* User Controls */}
        <div className="user-controls">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="user-control-link">
                <FaUser />
                <span className="control-text">Profile</span>
              </Link>
              <Link to="/cart" className="user-control-link cart-link">
                <FaShoppingCart />
                <span className="control-text">Cart</span>
                <span className="cart-count">3</span>
              </Link>
            </>
          ) : (
            <button className="login-button" onClick={toggleLogin}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li><Link to="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/shop" className="mobile-nav-link" onClick={closeMenu}>Shop</Link></li>
          <li><Link to="/about" className="mobile-nav-link" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" className="mobile-nav-link" onClick={closeMenu}>Profile</Link></li>
              <li>
                <Link to="/cart" className="mobile-nav-link" onClick={closeMenu}>
                  Cart <span className="mobile-cart-count">3</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="mobile-login-button" onClick={toggleLogin}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;