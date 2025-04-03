import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({
  children,
  anonymous = false,
  isLoggedInLoading,
}) {

  const {isLoggedIn}
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isLoggedInLoading) return null;

  // If the user is logged in redirect them away from our anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Otherwise, display the children of the current route.
  return children;