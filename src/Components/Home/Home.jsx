import React, { useState, useEffect } from 'react';
import './home.css';
import Axios from "../../../Axios/Axios"


function Home() {

 
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Handmade with Love, Just for You</h1>
          <p>Unique handcrafted charms that tell your personal story</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="collections">
        <h2>Our Collections</h2>
        <div className="collection-grid">
          <div className="collection-item">
            <div className="collection-image miniatures"></div>
            <h3>Miniature Worlds</h3>
            <p>Tiny treasures with incredible detail</p>
            <button className="secondary-button">Explore</button>
          </div>
          <div className="collection-item">
            <div className="collection-image keychains"></div>
            <h3>Artistic Keychains</h3>
            <p>Carry your personality everywhere</p>
            <button className="secondary-button">Explore</button>
          </div>
          <div className="collection-item">
            <div className="collection-image jewelry"></div>
            <h3>Charming Jewelry</h3>
            <p>Wearable art that sparks conversation</p>
            <button className="secondary-button">Explore</button>
          </div>
          <div className="collection-item">
            <div className="collection-image custom"></div>
            <h3>Custom Creations</h3>
            <p>Your ideas brought to life</p>
            <button className="secondary-button">Explore</button>
          </div>
        </div>
      </section>



      {/* Behind the Scenes */}
      <section className="behind-scenes">
        <h2>Crafted with Passion</h2>
        <div className="crafting-story">
          <div className="story-media">
            <div className="video-placeholder"></div>
          </div>
          <div className="story-content">
            <h3>Meet the Artist</h3>
            <p>Every CharmCrafts piece begins in my small studio, where imagination meets craftsmanship. I've been creating miniature art for over 8 years, turning tiny spaces into worlds of wonder.</p>
            <p>Each item is carefully handcrafted using sustainable materials and traditional techniques, ensuring that your charm is not just beautiful but also built to last.</p>
            <button className="secondary-button">My Story</button>
          </div>
        </div>
        <div className="process-gallery">
          <div className="process-image process1"></div>
          <div className="process-image process2"></div>
          <div className="process-image process3"></div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <div className="customer-image customer1"></div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"I ordered a custom charm of my cat and it's PERFECT! The attention to detail is incredible. Everyone asks where I got it!"</p>
            <p className="customer-name">- Sarah M.</p>
          </div>
          <div className="testimonial">
            <div className="customer-image customer2"></div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"The fairy garden keychain brings me joy every time I look at it. Such amazing craftsmanship in something so small!"</p>
            <p className="customer-name">- James K.</p>
          </div>
          <div className="testimonial">
            <div className="customer-image customer3"></div>
            <div className="stars">★★★★★</div>
            <p className="review-text">"These make the BEST gifts. I've ordered three different custom pieces and each one was more amazing than the last."</p>
            <p className="customer-name">- Elena R.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Join the CharmCrafts Family</h2>
        <p>Subscribe for early access to new collections, exclusive discounts, and crafting tips!</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit" className="cta-button">Subscribe</button>
        </form>
      </section>

      {/* Instagram Feed */}
      <section className="instagram-feed">
        <h2>Follow Our Journey</h2>
        <p className="instagram-handle">@CharmCraftsStudio</p>
        <div className="instagram-grid">
          <div className="instagram-post post1"></div>
          <div className="instagram-post post2"></div>
          <div className="instagram-post post3"></div>
          <div className="instagram-post post4"></div>
          <div className="instagram-post post5"></div>
          <div className="instagram-post post6"></div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How long does shipping take?</h3>
          <p>Ready-made items ship within 1-3 business days. Custom orders typically take 1-2 weeks before shipping.</p>
        </div>
        <div className="faq-item">
          <h3>Are your products waterproof?</h3>
          <p>Most items are sealed for protection, but we recommend removing jewelry before swimming or showering.</p>
        </div>
        <div className="faq-item">
          <h3>Can I request a custom design?</h3>
          <p>Absolutely! Contact us with your idea and we'll bring it to life.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;