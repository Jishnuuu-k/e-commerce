import React, { useState } from "react";
import axios from "../../../../Axios/Axios"; 
import "./register.css";

function Registration() {
  const [formData, setFormData] = useState({
    Fullname: "",
    Email: "",
    Username: "",
    PhoneNum: "",
    Gender: "", 
    StreetAddress: "",
    City: "",
    Pincode: "",
    Password: ""
  });

  const [error, setError] = useState({}); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    setError({
      ...error,
      [e.target.name]: "", 
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); 

    try {
      console.log("Sending Data:", formData);
      const response = await axios.post("/Users/auth/userregistration", formData);
      console.log("Server Response:", response.data);

      if (response.data.success) {
        alert("Registration Successful!"); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error Response:", error.response.data);

        
        setError({
          Username: error.response.data.message.includes("Username") ? error.response.data.message : "",
          Email: error.response.data.message.includes("Email") ? error.response.data.message : "",
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Fullname" placeholder="Fullname" value={formData.Fullname} onChange={handleChange} required />
        
        <input
          type="text"
          name="Username"
          placeholder="Enter Username"
          value={formData.Username}
          onChange={handleChange}
          className={error.Username ? "input-error" : ""}
          required
        />

        <input
          type="email"
          name="Email"
          placeholder="Enter Email"
          value={formData.Email}
          onChange={handleChange}
          className={error.Email ? "input-error" : ""}
          required
        />

        <input type="number" name="PhoneNum" placeholder="Phone Number" value={formData.PhoneNum} onChange={handleChange} required />
        <input type="text" name="Gender" placeholder="Gender" value={formData.Gender} onChange={handleChange} required />
        <input type="text" name="StreetAddress" placeholder="Street Address" value={formData.StreetAddress} onChange={handleChange} required />
        <input type="text" name="City" placeholder="City" value={formData.City} onChange={handleChange} required />
        <input type="text" name="Gender" placeholder="Gender" value={formData.Gender} onChange={handleChange} required />
        <input type="number" name="Pincode" placeholder="Pincode" value={formData.Pincode} onChange={handleChange} required />
        <input type="password" name="Password" placeholder="Password" value={formData.Password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
