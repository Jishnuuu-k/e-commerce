import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../AppContext";
import "./header.css";

function Header() {
  const { authToken, user, logout } = useContext(AuthContext);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  return (
    <header className="navigation-bar">
      <div className="nav-logo">
        <Link to="/">
          <h2>MOTO HUB</h2>
        </Link>
      </div>
      
      <nav className="nav-options">
        <Link to="/about">About Us</Link>
        <Link to="/products">Products</Link>
        
        {authToken ? (
          <>
            <Link to="/profile">
              <i className="fas fa-user-circle"></i> {user?.Username || "Profile"}
            </Link>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
            <button onClick={logout} className="logout-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
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
                <Link to="/login" onClick={() => setShowAuthDropdown(false)}>
                  <i className="fas fa-sign-in-alt"></i> Sign In
                </Link>
                <Link to="/register" onClick={() => setShowAuthDropdown(false)}>
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;