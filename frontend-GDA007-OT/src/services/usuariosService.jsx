import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para incluir el token en las solicitudes
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

export const getUsuarios = async () => {
  try {
    const response = await axiosInstance.get("/api/usuarios/get");
    //console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error al obtener los Usuarios: ", error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const crearUsuario = async (usuarioData) => {
  console.log(usuarioData)
  try {
    const response = await axiosInstance.post("/api/usuarios/insert", usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el Usuario: ", error);
    throw error;
  }
};

// Función para actualizar un producto
export const actualizarUsuario = async (usuarioData) => {
  try {
    const response = await axiosInstance.put(`/api/usuarios/update`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar Usuario: ", error);
    throw error;
  }
};

// Función para eliminar un producto
export const desactivarProducto = async (productId) => {
  try {
    const response = await axiosInstance.put(`/api/usuarios/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar Usuario: ", error);
    throw error;
  }
};
