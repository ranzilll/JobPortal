import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"; // Correct import

const ProtectedRoute = ({ component: Component, role }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
  console.log("ProtectedRoute - userRole:", userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
