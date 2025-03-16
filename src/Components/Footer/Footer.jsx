import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h3>CharmCrafts</h3>
            <p className="footer-tagline">Handmade with love, just for you</p>
            <div className="footer-social">
              <a href="https://instagram.com" className="social-icon">
                <span>📸</span>
              </a>
              <a href="https://facebook.com" className="social-icon">
                <span>👍</span>
              </a>
              <a href="https://pinterest.com" className="social-icon">
                <span>📌</span>
              </a>
              <a href="https://tiktok.com" className="social-icon">
                <span>🎵</span>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><a href="/shop/miniatures">Miniature Worlds</a></li>
              <li><a href="/shop/keychains">Artistic Keychains</a></li>
              <li><a href="/shop/jewelry">Charming Jewelry</a></li>
              <li><a href="/shop/custom">Custom Creations</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="/shipping">Shipping & Returns</a></li>
              <li><a href="/care-guide">Care Guide</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/track-order">Track Your Order</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <ul className="footer-links">
              <li><a href="/our-story">Our Story</a></li>
              <li><a href="/materials">Materials & Process</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
              <li><a href="/wholesale">Wholesale</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p className="newsletter-text">Subscribe for early access to new collections and exclusive offers!</p>
            <form className="footer-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <div className="footer-policies">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/accessibility">Accessibility</a>
            </div>
            <p className="copyright">© {new Date().getFullYear()} CharmCrafts. All rights reserved.</p>
          </div>
          <p className="designer-credit">
            Designed and Developed with <span className="heart">❤️</span> by <a href="https://instagram.com/speedmonn" target="_blank" rel="noopener noreferrer">speedmonn</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;