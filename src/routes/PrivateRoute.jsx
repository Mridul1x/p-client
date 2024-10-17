import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userStore = useSelector((state) => state.user?.user);
  const location = useLocation();

  if (!userStore) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userStore.role !== "admin" && userStore.role !== "superAdmin") {
    // If user is NOT an admin or superAdmin, redirect to home page
    return <Navigate to="/" replace />;
  }

  // If user is an admin, render the protected component
  return children;
};

export default PrivateRoute;
