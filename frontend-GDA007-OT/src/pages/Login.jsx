import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 20}}>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default Login;
