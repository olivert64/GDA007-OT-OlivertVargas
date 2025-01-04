import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCategoria = async () => {
  try {
    const response = await axiosInstance.get("/api/categoriaProductos/get");
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las Categorias: ", error);
    throw error;
  }
};

// Función para crear una nueva categoria
export const crearCategoria = async (categoriaData) => {
  console.log(categoriaData)
  try {
    const response = await axiosInstance.post("/api/categoriaProductos/insert", categoriaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

// Función para actualizar un categoria
export const actualizarCategoria = async (categoriaData) => {
  try {
    const response = await axiosInstance.put("/api/categoriaProductos/update", categoriaData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

// Función para eliminar un producto
export const desactivarCategoria = async (categoriaId) => {
  try {
    const response = await axiosInstance.put(`/api/categoriaProductos/delete/${categoriaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

