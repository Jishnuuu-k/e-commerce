import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AppContext";
import "./profile.css";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="header-actions">
          <button className="edit-button">
            <i className="fas fa-edit"></i> Edit Profile
          </button>
          <button onClick={logout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-image-section">
          <div className="image-container">
            <img 
              src={user?.profileImage || "https://via.placeholder.com/150"} 
              alt="Profile" 
              className="profile-image" 
            />
            <div className="image-overlay">
              <button className="change-photo-btn">
                <i className="fas fa-camera"></i> Change Photo
              </button>
            </div>
          </div>
          <h2 className="user-name">{user?.Fullname}</h2>
          <p className="user-title">{user?.Username}</p>
        </div>
        
        <div className="profile-details">
          {user ? (
            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h3>Full Name</h3>
                  <p>{user.Fullname}</p>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{user.Email}</p>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h3>Phone Number</h3>
                  <p>{user.PhoneNum || "Not provided"}</p>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-venus-mars"></i>
                </div>
                <div>
                  <h3>Gender</h3>
                  <p>{user.Gender || "Not specified"}</p>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3>Address</h3>
                  <p>
                    {user.StreetAddress && <>{user.StreetAddress}<br/></>}
                    {user.city && <>{user.city}, </>}
                    {user.pincode && user.pincode}
                  </p>
                </div>
              </div>
              
              <div className="detail-card">
                <div className="detail-icon">
                  <i className="fas fa-calendar-alt"></i>
                </div>
                <div>
                  <h3>Member Since</h3>
                  <p>{user.joinDate || "Unknown"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="login-prompt">
              <i className="fas fa-user-lock"></i>
              <p>Please log in to view your profile</p>
              <Link to="/login"><button className="login-btn">Login</button></Link>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;