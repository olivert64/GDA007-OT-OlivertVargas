import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user } = useAuth();
  const { logout } = useAuth();

  console.log(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.idRol)) {
    logout();
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
