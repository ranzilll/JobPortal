import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";  // No need to import Router here
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import AdminPanel from "./components/AdminPanel";
import CandidatePortal from "./components/CandidatePortal";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const location = useLocation(); // Get current route path

  // Load authentication status from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedRole = localStorage.getItem("userRole");
    if (storedAuth && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.clear();
  };

  // Protected route for role-based access
  const ProtectedRoute = ({ children, role }) => {
    if (!isAuthenticated || userRole !== role) {
      return <Navigate to={`/login/${role}`} />;
    }
    return children;
  };

  return (
    <div>
      {/* Conditionally render Logout button */}
      {isAuthenticated && location.pathname !== "/" && location.pathname !== "/login/admin" && location.pathname !== "/login/candidate" && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login/:role"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />}
        />
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate-portal"
          element={
            <ProtectedRoute role="candidate">
              <CandidatePortal onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
