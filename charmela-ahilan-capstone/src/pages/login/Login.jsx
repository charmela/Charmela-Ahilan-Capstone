import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State variables to hold email, password, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  console.log(apiUrl);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after login attempt
    }
  };

  return (
    <div className="Login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isLoading ? "Loading..." : "Login"}</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="btn login_btn" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
