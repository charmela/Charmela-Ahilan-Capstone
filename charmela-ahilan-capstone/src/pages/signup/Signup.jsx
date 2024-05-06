import React, { useState } from "react";
import axios from "axios";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  // State variables to hold username, email, password, and loading state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      // Make a POST request to the signup endpoint
      const response = await axios.post(`${apiUrl}/api/auth/register`, {
        username,
        email,
        password,
      });
      toast.success("Signup successful");
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error signing up");
      setError(error?.response?.data?.message || "Error signing up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>{isLoading ? "Loading..." : "Sign Up"}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button className="btn signup_btn" type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
