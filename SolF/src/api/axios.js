import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Habilita envío de cookies si usas JWT con sesiones
});

// Interceptor para añadir el token a las solicitudes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autorización (401)
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token expiró o es inválido
      localStorage.removeItem("token");
      // Redirigir al login (si es necesario)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;