import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }
  return children;
}

export default AuthRequire;
