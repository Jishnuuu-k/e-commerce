import React from 'react';
import './profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <label>Full Name:</label>
          <span>John Doe</span>
        </div>
        <div className="profile-item">
          <label>Email:</label>
          <span>johndoe@example.com</span>
        </div>
        <div className="profile-item">
          <label>Phone Number:</label>
          <span>+1234567890</span>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <span>johndoe123</span>
        </div>
        <div className="profile-item">
          <label>Gender:</label>
          <span>Male</span>
        </div>
        <div className="profile-item">
          <label>Address:</label>
          <span>123 Main St, Springfield, IL, USA</span>
        </div>
      </div>
      <button className="logout-btn">Logout</button>
    </div>
  );
}

export default Profile;