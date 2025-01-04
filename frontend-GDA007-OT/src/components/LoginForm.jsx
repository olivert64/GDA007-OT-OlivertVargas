import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, TextField, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const schema = yup.object().shape({
  correoElectronico: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  passwrd: yup.string().required("La contraseña es obligatoria"),
});

const LoginForm = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await login(data); // Llama al contexto para autenticar
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 350 }}
    >
      <TextField
        label="Correo Electrónico"
        {...register("correoElectronico")}
        error={!!errors.correoElectronico}
        helperText={errors.correoElectronico?.message}
      />
      <TextField
        label="Contraseña"
        type="password"
        {...register("passwrd")}
        error={!!errors.passwrd}
        helperText={errors.passwrd?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default LoginForm;
