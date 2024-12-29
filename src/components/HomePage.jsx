import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to the Job Portal</h1>
        <p>Your journey to finding the perfect job starts here.</p>
        <div className="button-group">
          <Link to="/login/admin" className="button primary">
            Admin Login
          </Link>
          <Link to="/login/candidate" className="button secondary">
            Candidate Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
