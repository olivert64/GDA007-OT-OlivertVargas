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

// Función para obtener todos los productos
export const getEstado = async () => {
  try {
    const response = await axiosInstance.get("/api/estados/get");
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Estados: ", error);
    throw error;
  }
};