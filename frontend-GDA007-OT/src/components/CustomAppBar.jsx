import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomAppBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Bienvenido, {user.email}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;