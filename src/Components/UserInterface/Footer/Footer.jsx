import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaMotorcycle, FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaHeart, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
  <footer className="main-footer">
  <div className="footer-container">
    <div className="footer-column">
      <div className="footer-logo">
        <FaMotorcycle className="logo-icon" />
        <h2>MOTO<span>GEAR</span></h2>
      </div>
      <p className="footer-tagline">Premium Motorcycle Accessories</p>
      <div className="footer-social">
        <a href="#" className="social-icon"><FaFacebook /></a>
        <a href="#" className="social-icon"><FaInstagram /></a>
        <a href="#" className="social-icon"><FaWhatsapp /></a>
      </div>
    </div>
    
    <div className="footer-column">
      <h3>Quick Links</h3>
      <ul className="footer-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
    
    <div className="footer-column">
      <h3>Categories</h3>
      <ul className="footer-links">
        <li><Link to="/category/helmets">Helmets</Link></li>
        <li><Link to="/category/jackets">Riding Jackets</Link></li>
        <li><Link to="/category/parts">Performance Parts</Link></li>
        <li><Link to="/category/accessories">Accessories</Link></li>
      </ul>
    </div>
    
    <div className="footer-column">
      <h3>Customer Service</h3>
      <ul className="footer-links">
        <li><Link to="/shipping">Shipping Policy</Link></li>
        <li><Link to="/returns">Returns & Exchanges</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
    </div>
  </div>
  
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} MotoGear. All Rights Reserved.</p>
    <div className="payment-methods">
      <span>Payment Methods:</span>
      <img src="/api/placeholder/200/30" alt="Payment Methods" />
    </div>
  </div>
  <div className="attribution">
            <p>Designed and Developed with <span className="heart"><FaHeart /></span> by <a href="https://instagram.com/speedmonn" target="_blank" rel="noopener noreferrer">speedmonn</a></p>
          </div>
</footer>
  );
}

export default Footer;