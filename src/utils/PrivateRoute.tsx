import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  requiredRole: string;
}

function PrivateRoute({ requiredRole }: PrivateRouteProps) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  // TODO: Исправить для каждой роли
  if (role !== requiredRole) {
    return <Navigate to="/tempWrongRole" replace />;
  }

  return <Outlet />;
}

export default React.memo(PrivateRoute);