import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "../../../AppContext";
import axios from "../../../../Axios/Axios";
import "./login.css";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const { login } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Username.trim() || !Password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await axios.post("/Users/auth/userlogin", {
        Username,
        Password,
      });

      console.log("Login Success:", response.data);

      const { token, user } = response.data;
      login(token, user);

      setError("");
      // Navigate to home page after successful login
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={error && !Username.trim() ? "error-input" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={error && !Password.trim() ? "error-input" : ""}
              />
            </div>

            <div className="remember-me">
              <label className="checkbox-label">
                <input type="checkbox" name="remember" />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </div>
        </form>

        <div className="form-footer">
          <a href="#forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <p>
            Don't have an account? <a href="/register">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;