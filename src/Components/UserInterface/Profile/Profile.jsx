import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AppContext";
import "./profile.css";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail, MdLocationPin  } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { TbGenderBigender } from "react-icons/tb";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  // Format join date if available
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className={`profile-container ${animate ? 'animate-in' : ''}`}>
      <div className="cyber-lines top-left"></div>
      <div className="cyber-lines bottom-right"></div>
      
      <div className="profile-header">
        <h1>
          <span className="text-glitch" data-text="PROFILE">PROFILE</span>
          <span className="header-accent"></span>
        </h1>
        
        <div className="header-actions">
          <button className="edit-button">
            <i className="fas fa-edit"></i> 
            <span>Edit Profile</span>
          </button>
          <button onClick={logout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        {user ? (
          <>
            <div className="profile-avatar">
              <div className="avatar-frame">
                <div className="avatar-image">
                  {user.Fullname ? user.Fullname.charAt(0).toUpperCase() : "U"}
                </div>
              </div>
              <h2 className="user-name">{user.Fullname}</h2>
              <div className="user-tag">@{user.Username}</div>
            </div>
            
            <div className="profile-details">
              <div className="section-title">
                <h2>Personal Information</h2>
                <div className="title-bar"></div>
              </div>
              
              <div className="details-grid">
                <div className="detail-card" data-label="USERNAME">
                  <div className="detail-icon">
                    <i className="fas fa-user"><FaRegUser/></i>
                  </div>
                  <div className="detail-content">
                    <h3>Username</h3>
                    <p>{user.Username}</p>
                  </div>
                </div>
                
                <div className="detail-card" data-label="EMAIL">
                  <div className="detail-icon">
                    <i className="fas fa-envelope"><MdOutlineMail/></i>
                  </div>
                  <div className="detail-content">
                    <h3>Email</h3>
                    <p>{user.Email}</p>
                  </div>
                </div>
                
                <div className="detail-card" data-label="PHONE">
                  <div className="detail-icon">
                    <i className="fas fa-phone"><FaPhoneFlip/></i>
                  </div>
                  <div className="detail-content">
                    <h3>Phone Number</h3>
                    <p>{user.PhoneNum || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="detail-card" data-label="GENDER">
                  <div className="detail-icon">
                    <i className="fas fa-venus-mars"><TbGenderBigender/></i>
                  </div>
                  <div className="detail-content">
                    <h3>Gender</h3>
                    <p>{user.Gender || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="detail-card" data-label="LOCATION">
                  <div className="detail-icon">
                    <i className="fas fa-map-marker-alt"><MdLocationPin /></i>
                  </div>
                  <div className="detail-content">
                    <h3>Address</h3>
                    <p>
                      {user.StreetAddress ? (
                        <>
                          {user.StreetAddress}<br/>
                          {user.city && <>{user.city}, </>}
                          {user.pincode && user.pincode}
                        </>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="detail-card" data-label="JOINED">
                  <div className="detail-icon">
                    <i className="fas fa-calendar-alt">a</i>
                  </div>
                  <div className="detail-content">
                    <h3>Member Since</h3>
                    <p>{formatDate(user.joinDate)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Reviews</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Wishlist</div>
              </div>
            </div>
          </>
        ) : (
          <div className="login-prompt">
            <div className="prompt-icon">
              <i className="fas fa-user-lock"></i>
            </div>
            <h2>Access Restricted</h2>
            <p>Please log in to view your profile information</p>
            <Link to="/login">
              <button className="login-btn">
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;