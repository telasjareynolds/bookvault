import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  anonymous?: boolean;
  isLoggedInLoading?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  anonymous = false,
  isLoggedInLoading = false,
}) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isLoggedInLoading) return null;

  if (anonymous && isLoggedIn) {
    // Redirect logged-in users away from pages like /login or /register
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isLoggedIn) {
    // Redirect unauthenticated users trying to access protected pages
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;