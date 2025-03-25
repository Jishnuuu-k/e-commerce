import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaInfoCircle, FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook, FaTwitter, FaYoutube, FaPinterest, FaHeart, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      {/* Wave SVG separator */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#15002b" fillOpacity="1" d="M0,128L48,133.3C96,139,192,149,288,165.3C384,181,480,203,576,197.3C672,192,768,160,864,149.3C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    
      {/* Footer main content */}
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-logo">ShopHub</h2>
          <p>Elevate your style with our premium collections of clothing, accessories, and footwear.</p>
          
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Fashion Street, Style City</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+1 (234) 567-8900</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>info@shophub.com</span>
            </div>
            <div className="contact-item">
              <FaClock className="contact-icon" />
              <span> 9AM - 8PM</span>
            </div>
          </div>
          
          <div className="social-media">
            <a href="https://www.instagram.com/speedmonn" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon-link">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon-link">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon-link">
              <FaYoutube />
            </a>
            <a href="#" className="social-icon-link">
              <FaPinterest />
            </a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/"><FaHome className="link-icon" /> Home</Link></li>
            <li><Link to="/shop"><FaShoppingBag className="link-icon" /> Shop</Link></li>
            <li><Link to="/about"><FaInfoCircle className="link-icon" /> About Us</Link></li>
            <li><Link to="/contact"><FaEnvelope className="link-icon" /> Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section categories">
          <h3>Shop Categories</h3>
          <ul>
            <li><Link to="/shop/1">Framed Photos</Link></li>
            <li><Link to="/shop/2">Gift Boxes</Link></li>
            <li><Link to="/shop/3">Accessories</Link></li>
            <li><Link to="/shop/4">Dolls</Link></li>
            <li><Link to="/shop/new">Custom Birthday Gifts</Link></li>
            <li><Link to="/shop/sale">Custom Gifts</Link></li>
          </ul>
        </div>
        
        <div className="footer-section newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with our latest collections and exclusive offers.</p>
          
          <form className="newsletter-form">
            <input type="email" placeholder="Your Email Address" />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
          

        </div>
      </div>
      
      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>&copy; {currentYear} ShopHub. All Rights Reserved.</p>
          </div>
          
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Shipping Info</a>
          </div>
          
          <div className="attribution">
            <p>Designed and Developed with <span className="heart"><FaHeart /></span> by <a href="https://instagram.com/speedmonn" target="_blank" rel="noopener noreferrer">speedmonn</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;