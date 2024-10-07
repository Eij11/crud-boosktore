import React from "react";
import { Navigate } from "react-router-dom";

// This is the ProtectedRoute component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token"); // Check if the user is authenticated
  const role = localStorage.getItem("role"); // Check the user's role

  // Check if token exists and if the user's role matches the required role
  if (!token || role !== requiredRole) {
    // If not authenticated or role doesn't match, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // If authenticated and the role matches, allow access to the protected route
  return children;
};

export default ProtectedRoute;
