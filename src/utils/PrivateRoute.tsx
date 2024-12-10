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

  // TODO: Прописать нужные роуты
  if (role !== requiredRole) {
    switch(role) {
      case 'admin':
        return <Navigate to="/institutes" replace />;
      case 'teacher': 
        return <Navigate to="/profile" replace />;
      default:
        return <Navigate to="/wrongRole" replace />;
    }
  }

  return <Outlet />;
}

export default React.memo(PrivateRoute);
