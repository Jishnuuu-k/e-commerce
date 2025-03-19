import React, { useState } from 'react';
import './register.css';

function Registration() {
  const [formData, setFormData] = useState({
    Fullname: '',
    Email: '',
    Username: '',
    PhoneNum: '',
    Gender: '',
    StreetAddress: '',
    City: '',
    Pincode: '',
    Password: '',
    ConfirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.Fullname) tempErrors.Fullname = "Full name is required";
    if (!formData.Email) tempErrors.Email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.Email)) tempErrors.Email = "Email is invalid";
    if (!formData.Username) tempErrors.Username = "Username is required";
    if (!formData.PhoneNum) tempErrors.PhoneNum = "Phone number is required";
    if (!formData.Gender) tempErrors.Gender = "Gender is required";
    if (!formData.StreetAddress) tempErrors.StreetAddress = "Street address is required";
    if (!formData.City) tempErrors.City = "City is required";
    if (!formData.Pincode) tempErrors.Pincode = "Pincode is required";
    if (!formData.Password) tempErrors.Password = "Password is required";
    else if (formData.Password.length < 6) tempErrors.Password = "Password must be at least 6 characters";
    if (formData.Password !== formData.ConfirmPassword) tempErrors.ConfirmPassword = "Passwords do not match";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data to server
      console.log("Form submitted:", formData);
      alert("Registration successful!");
      // Reset form after submission
      setFormData({
        Fullname: '',
        Email: '',
        Username: '',
        PhoneNum: '',
        Gender: '',
        StreetAddress: '',
        City: '',
        Pincode: '',
        Password: '',
        ConfirmPassword: ''
      });
    }
  };

  return (
    <div className="registration-container">
      <div className="form-header">
        <h2>Create Your Account</h2>
        <p>Join us to start shopping!</p>
      </div>
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          
          <div className="form-group">
            <label htmlFor="Fullname">Full Name</label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Enter your full name"
              value={formData.Fullname}
              onChange={handleChange}
              className={errors.Fullname ? "error-input" : ""}
            />
            {errors.Fullname && <div className="error">{errors.Fullname}</div>}
          </div>

          <div className="form-flex-container">
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                placeholder="Enter your email"
                value={formData.Email}
                onChange={handleChange}
                className={errors.Email ? "error-input" : ""}
              />
              {errors.Email && <div className="error">{errors.Email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                id="Username"
                name="Username"
                placeholder="Choose a username"
                value={formData.Username}
                onChange={handleChange}
                className={errors.Username ? "error-input" : ""}
              />
              {errors.Username && <div className="error">{errors.Username}</div>}
            </div>
          </div>

          <div className="form-flex-container">
            <div className="form-group">
              <label htmlFor="PhoneNum">Phone Number</label>
              <input
                type="tel"
                id="PhoneNum"
                name="PhoneNum"
                placeholder="Enter your phone number"
                value={formData.PhoneNum}
                onChange={handleChange}
                className={errors.PhoneNum ? "error-input" : ""}
              />
              {errors.PhoneNum && <div className="error">{errors.PhoneNum}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="Gender">Gender</label>
              <div className="gender-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    checked={formData.Gender === "Male"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    checked={formData.Gender === "Female"}
                    onChange={handleChange}
                  />
                  <span className="radio-custom"></span>
                  Female
                </label>
              </div>
              {errors.Gender && <div className="error">{errors.Gender}</div>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Address Details</h3>
          
          <div className="form-group">
            <label htmlFor="StreetAddress">Street Address</label>
            <input
              type="text"
              id="StreetAddress"
              name="StreetAddress"
              placeholder="Enter your street address"
              value={formData.StreetAddress}
              onChange={handleChange}
              className={errors.StreetAddress ? "error-input" : ""}
            />
            {errors.StreetAddress && <div className="error">{errors.StreetAddress}</div>}
          </div>

          <div className="form-flex-container">
            <div className="form-group">
              <label htmlFor="City">City</label>
              <select
                id="City"
                name="City"
                value={formData.City}
                onChange={handleChange}
                className={errors.City ? "error-input" : ""}
              >
                <option value="">Select City</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Kollam">Kollam</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Idukki">Idukki</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
              </select>
              {errors.City && <div className="error">{errors.City}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="Pincode">Pincode</label>
              <input
                type="text"
                id="Pincode"
                name="Pincode"
                placeholder="Enter your pincode"
                value={formData.Pincode}
                onChange={handleChange}
                className={errors.Pincode ? "error-input" : ""}
              />
              {errors.Pincode && <div className="error">{errors.Pincode}</div>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Set Password</h3>
          
          <div className="form-flex-container">
            <div className="form-group">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Choose a password"
                value={formData.Password}
                onChange={handleChange}
                className={errors.Password ? "error-input" : ""}
              />
              {errors.Password && <div className="error">{errors.Password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                placeholder="Confirm your password"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                className={errors.ConfirmPassword ? "error-input" : ""}
              />
              {errors.ConfirmPassword && <div className="error">{errors.ConfirmPassword}</div>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Create Account</button>
        </div>
        
        <div className="form-footer">
          <p>Already have an account? <a href="#">Sign In</a></p>
        </div>
      </form>
    </div>
  );
}

export default Registration;