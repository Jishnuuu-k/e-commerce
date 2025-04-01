import React, { useState, useEffect, useContext  } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaUsers } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { TbCategory, TbReportAnalytics } from "react-icons/tb";
import { FiShoppingCart, FiLogOut  } from "react-icons/fi";
import { SiCoffeescript } from "react-icons/si";
import { IoArrowRedoOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../../../AppContext";
import "./sidebar.css";

const Sidebar = ({ onToggle }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  // Check if current route matches and set active menu accordingly
  useEffect(() => {
    const path = location.pathname;
    
    // Set active main menu based on path
    if (path.includes('/dashboard')) setOpenMenu(null);
    else if (path.includes('/product')) setOpenMenu('productManagement');
    else if (path.includes('/category')) setOpenMenu('categoryManagement');
    else if (path.includes('/order')) setOpenMenu('orderManagement');
    else if (path.includes('/customer')) setOpenMenu('customerManagement');
  }, [location]);

  const toggleSidebar = () => {
    const newWidth = isOpen ? 60 : 250;
    setIsOpen(!isOpen);
    if (onToggle) onToggle(newWidth);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Helper to check if a menu item is active
  const isActive = (path) => location.pathname === path;
  
  // Helper to check if a submenu should be considered active
  const isSubmenuActive = (basePath) => location.pathname.includes(basePath);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="top-section">
        {isOpen && (
          <div className="logo-container">
            <SiCoffeescript className="Cup-icon" />
            <span className="logo">MOTO HUB</span>
          </div>
        )}
        <div className="menu-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
      </div>

      <div className="menu">
        <Link to="/dashboard">
          <div 
            className={`menu-options ${isActive('/dashboard') ? 'active' : ''}`} 
            data-title="Dashboard"
          >
            <MdDashboard className="icon" />
            {isOpen && <span>Dashboard</span>}
          </div>
        </Link>

        {/* Product Management */}
        <div 
          className={`menu-options ${isSubmenuActive('/product') ? 'active' : ''}`} 
          onClick={() => toggleMenu("productManagement")}
          data-title="Product Management"
        >
          <BsBoxSeam className="icon" />
          {isOpen && <span>Product Management</span>}
          {isOpen && <IoArrowRedoOutline className={`arrow-icon ${openMenu === "productManagement" ? "rotated" : ""}`} />}
        </div>
        <div className={`submenu ${openMenu === "productManagement" ? "open" : ""}`}>
          <Link to="/add-products" className={isActive('/add-products') ? 'active' : ''}>Add Product</Link>
          <Link to="/view-products" className={isActive('/view-products') ? 'active' : ''}>View Products</Link>
        </div>

        {/* Category & Subcategory Management */}
        <div 
          className={`menu-options ${isSubmenuActive('/category') ? 'active' : ''}`} 
          onClick={() => toggleMenu("categoryManagement")}
          data-title="Category Management"
        >
          <TbCategory className="icon" />
          {isOpen && <span>Category Management</span>}
          {isOpen && <IoArrowRedoOutline className={`arrow-icon ${openMenu === "categoryManagement" ? "rotated" : ""}`} />}
        </div>
        <div className={`submenu ${openMenu === "categoryManagement" ? "open" : ""}`}>
          <Link to="/add-category" className={isActive('/add-category') ? 'active' : ''}>Add Category</Link>
          <Link to="/view-category" className={isActive('/view-category') ? 'active' : ''}>View Categories</Link>
        </div>

        {/* Order Management */}
        <div 
          className={`menu-options ${isSubmenuActive('/order') ? 'active' : ''}`} 
          onClick={() => toggleMenu("orderManagement")}
          data-title="Order Management"
        >
          <FiShoppingCart className="icon" />
          {isOpen && <span>Order Management</span>}
          {isOpen && <IoArrowRedoOutline className={`arrow-icon ${openMenu === "orderManagement" ? "rotated" : ""}`} />}
        </div>
        <div className={`submenu ${openMenu === "orderManagement" ? "open" : ""}`}>
          <Link to="/view-orders" className={isActive('/view-orders') ? 'active' : ''}>View Orders</Link>
          <Link to="/view-order/status" className={isActive('/view-order/status') ? 'active' : ''}>Update Order Status</Link>
        </div>

        {/* Customer Management */}
        <div 
          className={`menu-options ${isSubmenuActive('/customer') ? 'active' : ''}`} 
          onClick={() => toggleMenu("customerManagement")}
          data-title="Customer Management"
        >
          <FaUsers className="icon" />
          {isOpen && <span>Customer Management</span>}
          {isOpen && <IoArrowRedoOutline className={`arrow-icon ${openMenu === "customerManagement" ? "rotated" : ""}`} />}
        </div>
        <div className={`submenu ${openMenu === "customerManagement" ? "open" : ""}`}>
          <Link to="/view/customers" className={isActive('/view/customers') ? 'active' : ''}>View Customers</Link>
        </div>
        <div className="logout-btn" onClick={logout}>
          <FiLogOut className="icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;