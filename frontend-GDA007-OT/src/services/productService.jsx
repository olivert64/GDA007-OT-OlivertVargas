import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para incluir el token en las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para obtener todos los productos
export const getProductos = async () => {
  try {
    const response = await axiosInstance.get("/api/productos/get");
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const crearProducto = async (productData) => {
  console.log(productData)
  try {
    const response = await axiosInstance.post("/api/productos/insert", productData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Función para actualizar un producto
export const actualizarProducto = async (productData) => {
  try {
    const response = await axiosInstance.put(`/api/productos/update`, productData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

// Función para eliminar un producto
export const desactivarProducto = async (productId) => {
  try {
    const response = await axiosInstance.put(`/api/productos/delete/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};
