import React from "react";
import { useRoutes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Operador/Dashboard";
import DashboardCliente from "../pages/DashboardCliente";
import GestionProductos from '../pages/Operador/GestionProductos'
import GestionCategorias from "../pages/Operador/GestionCategorias"
import GestionUsuarios from "../pages/Operador/GestionUsuarios"

const AppRoutes = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/dashboard",
      element: (
        //<ProtectedRoute rolesPermitidos={[1]}>
        <Dashboard />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/dashboard-cliente",
      element: (
        <ProtectedRoute rolesPermitidos={[2]}>
          <DashboardCliente />
        </ProtectedRoute>
      ),
    },
    {
      path: "/manage-products",
      element: (
        // <ProtectedRoute rolesPermitidos={[2]}>
        <GestionProductos />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/manage-categories",
      element: (
        // <ProtectedRoute rolesPermitidos={[2]}>
        <GestionCategorias />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/manage-users",
      element: (
        // <ProtectedRoute rolesPermitidos={[2]}>
        <GestionUsuarios />
        //</ProtectedRoute>
      ),
    },
  ]);
};

export default AppRoutes;
