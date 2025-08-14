import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import React from "react";
import { getTokenPayload } from "../utils/getTokenPayload";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const location = useLocation();
  const payload = getTokenPayload(); // extract user info (like role) from token

  if (!payload) {
    // Not logged in → redirect to login with return path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(payload.role)) {
    // Role not allowed → redirect to unauthorized page or homepage
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
