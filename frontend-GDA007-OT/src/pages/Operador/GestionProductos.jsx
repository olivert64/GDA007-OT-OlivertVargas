import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { getProductos, crearProducto, actualizarProducto, desactivarProducto } from "../../services/productService";
import { getCategoria } from "../../services/categoriaService";
import { getUsuarios } from "../../services/usuariosService";
import { getEstado } from "../../services/estadoService";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    idProducto: "",
    CategoriaProductos_idCategoriaProductos: "",
    usuarios_idUsuarios: "",
    nombre: "",
    marca: "",
    codigo: "",
    cantidad: "",
    estados_idEstados: "",
    precio: "",
    fotoUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchStates();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProductos();

      const data = await response.data;
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error al obtener los productos.");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategoria();

      const data = await response.data;
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error al obtener las categorias");
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
        setStates(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error al obtener los Estados");
        setLoading(false);
      }
  };

  const handleOpenDialog = (
    product = {
      idProducto: "",
      CategoriaProductos_idCategoriaProductos: "",
      usuarios_idUsuarios: "",
      nombre: "",
      marca: "",
      codigo: "",
      cantidad: "",
      estados_idEstados: "",
      precio: "",
      fotoUrl: "",
    }
  ) => {
    setCurrentProduct(product);
    setIsEditing(!!product.idProducto);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct({
      idProducto: "",
      CategoriaProductos_idCategoriaProductos: "",
      usuarios_idUsuarios: "",
      nombre: "",
      marca: "",
      codigo: "",
      cantidad: "",
      estados_idEstados: "",
      precio: "",
      fotoUrl: "",
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await actualizarProducto(currentProduct);
      } else {
        await crearProducto(currentProduct);
      }
      await fetchProducts();
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: `Producto ${isEditing ? "actualizado" : "agregado"} exitosamente`,
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al guardar el producto. Por favor, intente de nuevo.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await desactivarProducto(id);
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      await fetchProducts();
      setSnackbar({ open: true, message: "Producto eliminado exitosamente" });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error al eliminar el producto. Por favor, intente de nuevo.",
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
        Gestión de Productos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDialog()}
        sx={{ mb: 3 }}
      >
        Agregar Producto
      </Button>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.idProducto} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "cover",
                }}
                image={product.fotoUrl}
                alt={product.nombre}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Marca: {product.marca}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Código: {product.codigo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad: {product.cantidad}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.precio.toFixed(2)}
                </Typography>
              </CardContent>
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <IconButton
                  onClick={() => handleOpenDialog(product)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product.idProducto)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Editar Producto" : "Agregar Producto"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nombre"
            label="Nombre del Producto"
            type="text"
            fullWidth
            variant="outlined"
            value={currentProduct.nombre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="marca"
            label="Marca"
            type="text"
            fullWidth
            variant="outlined"
            value={currentProduct.marca}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="codigo"
            label="Código"
            type="text"
            fullWidth
            variant="outlined"
            value={currentProduct.codigo}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cantidad"
            label="Cantidad"
            type="number"
            fullWidth
            variant="outlined"
            value={currentProduct.cantidad}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="precio"
            label="Precio"
            type="number"
            fullWidth
            variant="outlined"
            value={currentProduct.precio}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="fotoUrl"
            label="URL de la Foto"
            type="text"
            fullWidth
            variant="outlined"
            value={currentProduct.fotoUrl}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="categoria-label">Categoría</InputLabel>
            <Select
              labelId="categoria-label"
              name="CategoriaProductos_idCategoriaProductos"
              value={currentProduct.CategoriaProductos_idCategoriaProductos}
              onChange={handleInputChange}
              label="Categoría"
            >
              {categories.map((category) => (
                <MenuItem key={category.idCategoriaProducto} value={category.idCategoriaProducto}>
                  {category.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="usuario-label">Usuario</InputLabel>
            <Select
              labelId="usuario-label"
              name="usuarios_idUsuarios"
              value={currentProduct.usuarios_idUsuarios}
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
              value={currentProduct.estados_idEstados}
              onChange={handleInputChange}
              label="Estado"
            >
              {states.map((state) => (
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

export default ProductManagement;
