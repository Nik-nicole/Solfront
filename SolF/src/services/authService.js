import API from "../api/axios";

export const auth = async (email, password, setError) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    
    console.log("Respuesta del backend:", response);
    
    if (response.data && response.access_token) {
      // Guardar el token en localStorage
      localStorage.setItem("token", response.access_token);
      
      // Configurar el token para solicitudes futuras
      API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      
      return true; // Indica éxito para redirección
    } else {
      setError("Respuesta inválida del servidor");
      return false;
    }
  } catch (err) {
    console.error("Error en el login:", err);
    
    // Manejo de diferentes tipos de errores
    if (err.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      if (err.response.status === 401) {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else if (err.response && err.response.error) {
        setError(err.response.error);
      } else {
        setError(`Error ${err.response.status}: Problema con la autenticación`);
      }
    } else if (err.request) {
      // La solicitud se hizo pero no se recibió respuesta
      setError("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
      // Algo sucedió al configurar la solicitud
      setError("Error al procesar la solicitud de inicio de sesión.");
    }
    
    return false;
  }
};

// Función para registrar un nuevo usuario
export const register = async (username, email, password, setError) => {
  try {
    const response = await API.post("/auth/register", { 
      username, 
      email, 
      password 
    });
    
    console.log("Respuesta del registro:", response.data);
    
    if (response.status === 201) {
      return true; // Registro exitoso
    } else {
      setError("Respuesta inválida del servidor");
      return false;
    }
  } catch (err) {
    console.error("Error en el registro:", err);
    
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error);
    } else {
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
    }
    
    return false;
  }
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
  delete API.defaults.headers.common['Authorization'];
};