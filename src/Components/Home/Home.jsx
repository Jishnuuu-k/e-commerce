import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShoppingBag, FaInfoCircle, FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import "./Home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    shop: false,
    about: false,
    contact: false
  });

  // Images for the slideshow
  const slideImages = [
    "https://via.placeholder.com/1920x1080.png?text=Trendy+Fashion+Collection",
    "https://via.placeholder.com/1920x1080.png?text=Premium+Quality+Products",
    "https://via.placeholder.com/1920x1080.png?text=Exclusive+Deals"
  ];

  // Product categories
  const categories = [
    {
      id: 1,
      name: "Men's Collection",
      image: "https://via.placeholder.com/400x300.png?text=Mens+Collection",
      description: "Explore our premium selection of men's clothing, from casual wear to formal attire."
    },
    {
      id: 2,
      name: "Women's Collection",
      image: "https://via.placeholder.com/400x300.png?text=Womens+Collection",
      description: "Discover the latest trends in women's fashion with our curated collection."
    },
    {
      id: 3,
      name: "Accessories",
      image: "https://via.placeholder.com/400x300.png?text=Accessories",
      description: "Complete your look with our stylish accessories including bags, jewelry, and more."
    },
    {
      id: 4,
      name: "Footwear",
      image: "https://via.placeholder.com/400x300.png?text=Footwear",
      description: "Step out in style with our comfortable and trendy footwear collection."
    }
  ];

  // Handle slideshow timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slideImages.length]);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = {
        hero: document.getElementById('hero-section'),
        shop: document.getElementById('shop-section'),
        about: document.getElementById('about-section'),
        contact: document.getElementById('contact-section')
      };
      
      const isElementVisible = (element, offset = 100) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight - offset;
      };
      
      setIsVisible({
        hero: isElementVisible(sections.hero),
        shop: isElementVisible(sections.shop),
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
          <h1 className="hero-title">ShopHub</h1>
          <p className="hero-slogan">Elevate Your Style, Embrace Your Uniqueness</p>
          <Link to="/shop" className="hero-button">
            Discover Our Collection <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </section>
      
      {/* SHOP SECTION */}
      <section id="shop-section" className={`shop-section ${isVisible.shop ? 'visible' : ''}`}>
        <div className="section-header">
          <h2>Our Collections</h2>
          <p>Explore our carefully curated categories</p>
        </div>
        
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
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
            <img src="https://via.placeholder.com/600x400.png?text=Our+Story" alt="Our Story" />
          </div>
          <div className="about-content">
            <h2>Our Story</h2>
            <p>Founded in 2020, ShopHub began with a simple mission: to provide high-quality, trendy products that help our customers express their unique style. What started as a small online store has grown into a trusted fashion destination for thousands of satisfied customers worldwide.</p>
            
            <div className="about-features">
              <div className="feature">
                <FaShoppingBag className="feature-icon" />
                <h3>What We Offer</h3>
                <p>We curate collections of clothing, accessories, and footwear that combine quality, style, and affordability.</p>
              </div>
              
              <div className="feature">
                <FaInfoCircle className="feature-icon" />
                <h3>How To Order</h3>
                <p>Browse our collections, add items to your cart, proceed to checkout, and have your order delivered straight to your doorstep.</p>
              </div>
            </div>
            
            <Link to="/about" className="about-button">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* CONTACT SECTION */}
      <section id="contact-section" className={`contact-section ${isVisible.contact ? 'visible' : ''}`}>
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>We'd love to hear from you</p>
        </div>
        
        <div className="contact-container">
          <div className="contact-form">
            <h3>Send Us Your Feedback</h3>
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
          
          <div className="contact-info">
            <h3>Connect With Us</h3>
            <p>Follow us on social media for the latest updates, promotions, and style inspiration.</p>
            
            <div className="social-links">
              <a href="https://www.instagram.com/speedmonn" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram className="social-icon" />
                <span>@speedmonn</span>
              </a>
              
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaWhatsapp className="social-icon" />
                <span>WhatsApp Us</span>
              </a>
              
              <a href="https://www.facebook.com/shophub" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook className="social-icon" />
                <span>ShopHub Official</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;