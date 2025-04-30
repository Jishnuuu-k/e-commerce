import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMotorcycle, FaTools, FaShieldAlt, FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import "./home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    featured: false,
    about: false,
    contact: false
  });
  const [scrolled, setScrolled] = useState(false);

  // Images for the slideshow - placeholder URLs for motorcycle accessories
  const slideImages = [
    "/api/placeholder/1200/800", // Replace with actual motorcycle helmet image
    "/api/placeholder/1200/800", // Replace with actual motorcycle jacket image
    "/api/placeholder/1200/800"  // Replace with actual motorcycle gloves image
  ];

  // Product categories
  const categories = [
    {
      id: 1,
      name: "Protection Gear",
      image: "/api/placeholder/400/300", // Replace with actual image
      description: "Premium helmets, jackets, and body armor to keep you safe on every ride."
    },
    {
      id: 2,
      name: "Performance Parts",
      image: "/api/placeholder/400/300", // Replace with actual image
      description: "Upgrade your bike with our high-performance exhausts, filters, and more."
    },
    {
      id: 3,
      name: "Riding Apparel",
      image: "/api/placeholder/400/300", // Replace with actual image
      description: "Stylish and functional riding wear for every weather condition."
    },
    {
      id: 4,
      name: "Bike Accessories",
      image: "/api/placeholder/400/300", // Replace with actual image
      description: "LED lights, phone mounts, saddlebags and other essential accessories."
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Carbon Fiber Helmet",
      image: "/api/placeholder/300/300",
      price: 299.99,
      rating: 4.8,
      category: "Protection"
    },
    {
      id: 2,
      name: "LED Headlight Kit",
      image: "/api/placeholder/300/300",
      price: 149.99,
      rating: 4.6,
      category: "Lighting"
    },
    {
      id: 3,
      name: "Armored Riding Jacket",
      image: "/api/placeholder/300/300",
      price: 199.99,
      rating: 4.9,
      category: "Apparel"
    }
  ];

  // Handle slideshow timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slideImages.length]);

  // Handle scroll animations and header change
  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        hero: document.getElementById('hero-section'),
        featured: document.getElementById('featured-section'),
        about: document.getElementById('about-section'),
        contact: document.getElementById('contact-section')
      };
      
      // Check if page is scrolled for header styling
      setScrolled(window.scrollY > 50);
      
      const isElementVisible = (element, offset = 100) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight - offset;
      };
      
      setIsVisible({
        hero: isElementVisible(sections.hero),
        featured: isElementVisible(sections.featured),
        about: isElementVisible(sections.about),
        contact: isElementVisible(sections.contact)
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on initial load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <div className="home-container">
        {/* HERO SECTION */}
        <section id="hero-section" className={`hero-section ${isVisible.hero ? 'visible' : ''}`}>
          <div className="slideshow-container">
            {slideImages.map((image, index) => (
              <div 
                key={index} 
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
            <div className="slideshow-overlay"></div>
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">RIDE BOLD<br /><span>GEAR UP</span></h1>
            <p className="hero-slogan">Premium Motorcycle Accessories for the Modern Rider</p>
            <div className="hero-buttons">
              <Link to="/products" className="hero-button primary">
                Shop Now <FaArrowRight className="btn-icon" />
              </Link>
              <Link to="/collections" className="hero-button secondary">
                Collections
              </Link>
            </div>
          </div>
          
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <div className="arrow-container">
              <div className="arrow"></div>
            </div>
          </div>
        </section>
        
        {/* FEATURED PRODUCTS SECTION */}
        <section id="featured-section" className={`featured-section ${isVisible.featured ? 'visible' : ''}`}>
          <div className="featured-header">
            <div className="glitch-container">
              <h2 className="glitch-text" data-text="TOP GEAR">TOP GEAR</h2>
            </div>
            <p>Bestselling Products That Define Performance</p>
          </div>
          
          <div className="featured-products">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-badge">{product.category}</div>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                    <span className="rating-number">({product.rating})</span>
                  </div>
                  <div className="product-price">${product.price}</div>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-all-container">
            <Link to="/products" className="view-all-btn">
              View All Products <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </section>
        
        {/* CATEGORIES SECTION */}
        <section id="categories-section" className="categories-section">
          <div className="categories-header">
            <h2>SHOP BY CATEGORY</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="categories-container">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <Link to={`/shop/${category.id}`} className="category-button">
                    Explore <FaArrowRight className="btn-icon" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* ABOUT US SECTION */}
        <section id="about-section" className={`about-section ${isVisible.about ? 'visible' : ''}`}>
          <div className="about-container">
            <div className="about-image">
              <img src="../../public/images/story.jpg" alt="Our Story" />
              <div className="about-image-overlay"></div>
            </div>
            <div className="about-content">
              <h2>OUR STORY</h2>
              <p>Founded by passionate riders in 2020, MotoGear began with a simple mission: to provide premium motorcycle accessories that enhance your riding experience. What started as a small garage operation has grown into a trusted destination for thousands of riders worldwide.</p>
              
              <div className="about-features">
                <div className="feature">
                  <FaMotorcycle className="feature-icon" />
                  <h3>Rider Focused</h3>
                  <p>Every product we offer is tested by real riders on real roads to ensure quality and performance.</p>
                </div>
                
                <div className="feature">
                  <FaTools className="feature-icon" />
                  <h3>Expert Support</h3>
                  <p>Our team of motorcycle enthusiasts is always ready to help you find the perfect gear for your ride.</p>
                </div>
                
                <div className="feature">
                  <FaShieldAlt className="feature-icon" />
                  <h3>Quality Guarantee</h3>
                  <p>We stand behind every product we sell with our satisfaction guarantee and extended warranties.</p>
                </div>
              </div>
              
            
            </div>
          </div>
        </section>
        
        {/* NEWSLETTER SECTION */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>JOIN THE MOTO<span>HUB</span> CLUB</h2>
            <p>Subscribe to our newsletter and get 10% off your first order plus exclusive access to new products and promotions.</p>
            
            <form className="newsletter-form">
              <div className="form-group">
                <input type="email" placeholder="Your Email Address" required />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </section>
        
        {/* CONTACT SECTION */}
        <section id="contact-section" className={`contact-section ${isVisible.contact ? 'visible' : ''}`}>
          <div className="section-header">
            <h2>GET IN TOUCH</h2>
            <p>We'd love to hear from you</p>
          </div>
          
          <div className="contact-container">
            <div className="contact-form">
              <h3>Send Us Your Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" placeholder="Your Name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="Your Email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
                </div>
                
                <button type="submit" className="submit-button">
                  Send Message <FaEnvelope className="btn-icon" />
                </button>
              </form>
            </div>
            
            <div className="contact-info" >
              <h3>Connect With Us</h3>
              <p>Follow us on social media for the latest updates, promotions, and riding tips.</p>
              
              <div className="social-links">
                <a href="https://www.instagram.com/motogear" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram className="social-icon" />
                  <span>@motogear</span>
                </a>
                
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaWhatsapp className="social-icon" />
                  <span>WhatsApp Support</span>
                </a>
                
                <a href="https://www.facebook.com/motogear" target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaFacebook className="social-icon" />
                  <span>MotoGear Official</span>
                </a>
              </div>
              
              <div className="store-info">
                <div className="info-item">
                  <strong>Hours:</strong> Monday-Friday 9AM-6PM, Saturday 10AM-4PM
                </div>
                <div className="info-item">
                  <strong>Address:</strong> 123 Rider Avenue, Moto City, MC 12345
                </div>
                <div className="info-item">
                  <strong>Phone:</strong> (555) 123-4567
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FOOTER */}
        
      </div>
    </>
  );
}

export default Home;