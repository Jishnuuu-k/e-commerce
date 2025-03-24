import React from 'react';
import './profile.css';

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-detail">
            <label>Full Name:</label>
            <span>John Doe</span>
          </div>
          <div className="profile-detail">
            <label>Email:</label>
            <span>johndoe@example.com</span>
          </div>
          <div className="profile-detail">
            <label>Phone Number:</label>
            <span>+1234567890</span>
          </div>
          <div className="profile-detail">
            <label>Username:</label>
            <span>johndoe123</span>
          </div>
          <div className="profile-detail">
            <label>Gender:</label>
            <span>Male</span>
          </div>
        </div>
        <div className="profile-section">
          <h2>Address</h2>
          <div className="profile-detail">
            <label>Street:</label>
            <span>123 Main St</span>
          </div>
          <div className="profile-detail">
            <label>City:</label>
            <span>Springfield</span>
          </div>
          <div className="profile-detail">
            <label>State:</label>
            <span>IL</span>
          </div>
          <div className="profile-detail">
            <label>Country:</label>
            <span>USA</span>
          </div>
        </div>
      </div>
      <div className="profile-footer">
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;