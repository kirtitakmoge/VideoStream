import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("id") !== null; // Check if "id" exists

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
