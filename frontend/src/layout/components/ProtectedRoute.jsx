
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, token } = useAuth();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // If logged in, render child routes
  return <Outlet />;
}
