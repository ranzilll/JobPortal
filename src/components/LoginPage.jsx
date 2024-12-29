import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminCredentials = {
      email: "admin@example.com",
      password: "admin123",
    };
    const candidateCredentials = {
      email: "candidate@example.com",
      password: "candidate123",
    };

    // Reset error state
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Login logic
    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      setIsAuthenticated(true);
      navigate("/admin-panel");
    } else if (email === candidateCredentials.email && password === candidateCredentials.password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "candidate");
      setIsAuthenticated(true);
      navigate("/candidate-portal");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all authentication data
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="login-page">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
