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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import {
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  desactivarCategoria,
} from "../../services/categoriaService";
import { getUsuarios } from "../../services/usuariosService";
import { getEstado } from "../../services/estadoService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    idCategoriaProducto: "",
    usuario_idUsuarios: "",
    nombre: "",
    estados_idEstados: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    fetchCategories();
    fetchUsers();
    fetchStates();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoria();

      const data = await response.data;

      setCategories(data);
    } catch (err) {
      setError("Error fetching categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsuarios();

      const data = await response.data;
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error al obtener las Usuarios");
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await getEstado();

      const data = await response.data;
      setEstados(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error al obtener los Estados");
      setLoading(false);
    }
  };

  const handleOpenDialog = (
    category = {
      idCategoriaProducto: "",
      usuario_idUsuarios: "",
      nombre: "",
      estados_idEstados: "",
    }
  ) => {
    setCurrentCategory(category);
    setIsEditing(!!category.idCategoriaProducto);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCategory({
      idCategoriaProducto: "",
      usuario_idUsuarios: "",
      nombre: "",
      estados_idEstados: "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await actualizarCategoria(currentCategory);
      } else {
        await crearCategoria(currentCategory);
      }

      await fetchCategories();
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: `Categoría ${
          isEditing ? "actualizada" : "agregada"
        } exitosamente`,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al guardar la categoría. Por favor, intente de nuevo.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await desactivarCategoria(id);
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
      await fetchCategories();
      setSnackbar({ open: true, message: "Categoría eliminada exitosamente" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al eliminar la categoría. Por favor, intente de nuevo.",
      });
    }
  };

  const getStatusName = (statusId) => {
    const status = estados.find((estado) => estado.idEstado === statusId);
    return status ? status.nombre : "Desconocido";
  };

  const getStatusColor = (statusId) => {
    const statusName = getStatusName(statusId);
    switch (statusName) {
      case "Activo":
        return "success";
      case "Inactivo":
        return "error";
      case "Pendiente":
        return "warning";
      default:
        return "default";
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Gestión de Categorías
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Agregar Categoría
      </Button>
      <Card>
        <CardContent>
          <List>
            {categories.map((category) => (
              <ListItem key={category.idCategoriaProducto} divider>
                <ListItemText
                  primary={category.nombre}
                  secondary={`Usuario: ${
                    users.find(
                      (user) => user.idUsuario === category.usuario_idUsuarios
                    )?.nombreCompleto || "N/A"
                  }`}
                />
                <ListItemSecondaryAction>
                  <Chip
                    label={getStatusName(category.estados_idEstados)}
                    color={getStatusColor(category.estados_idEstados)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(category.idCategoriaProducto)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Editar Categoría" : "Agregar Categoría"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            variant="outlined"
            value={currentCategory.nombre}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="usuario-label">Usuario</InputLabel>
            <Select
              labelId="usuario-label"
              name="usuario_idUsuarios"
              value={currentCategory.usuario_idUsuarios}
              onChange={handleInputChange}
              label="Usuario"
            >
              {users.map((user) => (
                <MenuItem key={user.idUsuario} value={user.idUsuario}>
                  {user.nombreCompleto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              name="estados_idEstados"
              value={currentCategory.estados_idEstados}
              onChange={handleInputChange}
              label="Estado"
            >
              {estados.map((state) => (
                <MenuItem key={state.idEstado} value={state.idEstado}>
                  {state.nombre}
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

export default CategoryManagement;
