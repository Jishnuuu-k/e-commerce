import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { RiShoppingBag2Fill } from 'react-icons/ri';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    setActiveDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.nav-item') && !event.target.closest('.mobile-nav-item')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  // Toggle dropdown menu
  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };
  
  // Navigation structure with nested dropdowns
  const navStructure = {
    'Motorcycle Accessories': {
      'Bike Protection': [
        'Lock system', 'Crash Guard', 'Frame Slider', 'Fluid Guards and Cap',
        'Master Cylinder Guard', 'Engine Guard and Skid Plate', 'Headlight Grill',
        'Radiator Grill', 'Tank Protectors', 'Body Cover', 'Screen Protectors',
        'Stand And Extenders', 'Chain Cover And Sprocket'
      ],
      'Handlebar and Accessories': [
        'Grips and Throttles', 'Hand Guard', 'Handle Bars', 'Handle Riser',
        'Lever Guards', 'Mirror', 'Mounts and Chargers', 'Handle Accessories'
      ],
      'Lighting': [
        'Tail Light', 'Auxiliary Light', 'Light Accessories', 'Indicator',
        'Headlight', 'HAZARD MODULE', 'FANCY LED LIGHT'
      ],
      'Performance Accessories': [
        'Airfilter', 'Exhaust', 'Performance', 'Exhaust Accessories'
      ],
      'Body Fairing and Fenders': [
        'Body Fairing', 'Fenders and Extenders', 'Tail Tidy'
      ],
      'Bike Essentials': [
        'Windshield', 'Winglet', 'Seat'
      ],
      'Foot Controls': [
        'Foot Pegs and Mounts'
      ],
      'Cleaning Accessories': [
        'Cleaning Accessories'
      ],
      'Wheel Accessories': [
        'Wheel Cover'
      ]
    },
    'Riding Gears': {
      'Rider Protection': [
        'Jackets', 'Gloves', 'Pants', 'Boots', 'KNEE AND ELBOW GUARDS', 'SHOE PROTECTOR'
      ],
      'Casuals': [
        'Face Mask and Balaclava', 'Rain Coats'
      ]
    },
    'Luggage and Touring': {
      'Bags And Backpacks': [
        'Back Pack', 'Saddle Bag', 'Tank Bag', 'Tail Bag'
      ],
      'Luggage Accessories': [
        'Aluminium Top Cases And Panniers', 'Plastic Top Case And Panniers', 'Panniers'
      ],
      'Touring Accessories': [
        'Saddle Stay', 'Jerry Can And Mounts', 'Bungee Cords And Nets'
      ]
    },
    'Helmets and Accessories': {
      'Helmets': [
        'Full Face Helmet', 'Half face Helmet', 'Offroad Helmets'
      ],
      'Accessories': [
        'Goggles', 'Helmet Accessories'
      ],
      'Rider Tech': [
        'Action Camera and Accessories', 'Communication', 'Navigation System'
      ]
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo-container">
          <RiShoppingBag2Fill className="logo-icon" />
          <span className="logo-text">MotoGear</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <ul className="nav-menu">
            {Object.keys(navStructure).map((category) => (
              <li key={category} className="nav-item">
                <div 
                  className="nav-link dropdown-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(category);
                  }}
                >
                  {category} <FaChevronDown className="dropdown-icon" />
                </div>
                
                {/* First level dropdown */}
                <div className={`dropdown-menu ${activeDropdown === category ? 'show' : ''}`}>
                  <div className="dropdown-content">
                    {Object.keys(navStructure[category]).map((subcategory) => (
                      <div key={subcategory} className="subcategory">
                        <h4 className="subcategory-title">{subcategory}</h4>
                        <ul className="subcategory-items">
                          {navStructure[category][subcategory].map((item) => (
                            <li key={item}>
                              <Link 
                                to={`/${category.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                className="subcategory-link"
                                onClick={closeMenu}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
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
          {Object.keys(navStructure).map((category) => (
            <li key={category} className="mobile-nav-item">
              <div 
                className="mobile-nav-link dropdown-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(category);
                }}
              >
                {category}
                <FaChevronDown className={`dropdown-icon ${activeDropdown === category ? 'rotated' : ''}`} />
              </div>
              
              {activeDropdown === category && (
                <div className="mobile-dropdown">
                  {Object.keys(navStructure[category]).map((subcategory) => (
                    <div key={subcategory} className="mobile-subcategory">
                      <h4 className="mobile-subcategory-title">{subcategory}</h4>
                      <ul className="mobile-subcategory-items">
                        {navStructure[category][subcategory].map((item) => (
                          <li key={item}>
                            <Link 
                              to={`/${category.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                              className="mobile-subcategory-link"
                              onClick={closeMenu}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
          
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