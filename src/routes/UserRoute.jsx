import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const UserRoute = ({ children }) => {
  const userStore = useSelector((state) => state.user?.user);
  const location = useLocation();

  if (!userStore) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userStore.role !== "user") {
    // If user is not an user, redirect to home page
    return <Navigate to="/" replace />;
  }
  return children;
};

export default UserRoute;
