import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import {
  getUsuarios,
  actualizarUsuario,
  crearUsuario,
  desactivarProducto,
} from "../../services/usuariosService";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    rol_idRol: "",
    correoElectronico: "",
    nombreCompleto: "",
    passwrd: "",
    direccion: "",
    telefono: "",
    fechaNacimiento: null,
    Clientes_idClientes: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsuarios();

      const data = await response.data;
      console.log(data);
      setUsers(data);
    } catch (err) {
      setError("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = () => {
    const predefinedRoles = [
      { idRol: 2, nombreRol: "Operador" },
      { idRol: 3, nombreRol: "Cliente" },
    ];
    setRoles(predefinedRoles);
  };

  const handleOpenDialog = (
    user = {
      rol_idRol: "",
      correoElectronico: "",
      nombreCompleto: "",
      passwrd: "",
      direccion: "",
      telefono: "",
      fechaNacimiento: null,
      Clientes_idClientes: null,
    }
  ) => {
    setCurrentUser({
      ...user,
      fechaNacimiento: user.fechaNacimiento
        ? dayjs(user.fechaNacimiento)
        : null,
    });
    setIsEditing(!!user.correoElectronico);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser({
      rol_idRol: "",
      correoElectronico: "",
      nombreCompleto: "",
      passwrd: "",
      direccion: "",
      telefono: "",
      fechaNacimiento: null,
      Clientes_idClientes: null,
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setCurrentUser((prev) => ({ ...prev, fechaNacimiento: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Formatear la fecha de nacimiento antes de enviar
      const formattedUser = {
        ...currentUser,
        fechaNacimiento: currentUser.fechaNacimiento
          ? dayjs(currentUser.fechaNacimiento).format("YYYY-MM-DD")
          : null,
      };
      
      if (isEditing) {
        await actualizarUsuario(formattedUser);
      } else {
        await crearUsuario(formattedUser);
      }

      await fetchUsers();
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: `Usuario ${
          isEditing ? "actualizado" : "agregado"
        } exitosamente`,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al guardar el usuario. Por favor, intente de nuevo.",
      });
    }
  };

  const handleDelete = async (correoElectronico) => {
    try {
      const response = await fetch(`/api/usuarios/${correoElectronico}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      await fetchUsers();
      setSnackbar({ open: true, message: "Usuario eliminado exitosamente" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al eliminar el usuario. Por favor, intente de nuevo.",
      });
    }
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Gestión de Usuarios
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Agregar Usuario
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.correoElectronico}>
                <TableCell>{user.nombreCompleto}</TableCell>
                <TableCell>{user.correoElectronico}</TableCell>
                <TableCell>
                  {roles.find((role) => role.idRol === user.rol_idRol)
                    ?.nombreRol || "N/A"}
                </TableCell>
                <TableCell>{user.telefono}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.correoElectronico)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Editar Usuario" : "Agregar Usuario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombreCompleto"
            label="Nombre Completo"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUser.nombreCompleto}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="correoElectronico"
            label="Correo Electrónico"
            type="email"
            fullWidth
            variant="outlined"
            value={currentUser.correoElectronico}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="passwrd"
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={currentUser.passwrd}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="direccion"
            label="Dirección"
            type="text"
            fullWidth
            variant="outlined"
            value={currentUser.direccion}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="telefono"
            label="Teléfono"
            type="tel"
            fullWidth
            variant="outlined"
            value={currentUser.telefono}
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Nacimiento"
              value={currentUser.fechaNacimiento}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
            />
          </LocalizationProvider>
          <FormControl fullWidth margin="dense">
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              name="rol_idRol"
              value={currentUser.rol_idRol}
              onChange={handleInputChange}
              label="Rol"
            >
              {roles.map((role) => (
                <MenuItem key={role.idRol} value={role.idRol}>
                  {role.nombreRol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? "Actualizar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default UserManagement;
