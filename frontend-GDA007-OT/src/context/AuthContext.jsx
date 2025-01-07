import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? jwtDecode(token) : null);
 

  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", credentials);
      const { token } = response.data.data;

      //console.log(response);

      // Decodifica el token (puedes usar jwt-decode si lo necesitas)
      const userData = jwtDecode(token);

      setUser(userData);
      setToken(token);
      localStorage.setItem("token", token); // Guarda el token en el almacenamiento local

      if(userData.idRol === 2){
        navigate('/dashboard');
      }else if(userData.idRol === 3){
        navigate('/dashboard-cliente');
      }

    } catch (error) {
      console.error(error);
      alert("Credenciales inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);