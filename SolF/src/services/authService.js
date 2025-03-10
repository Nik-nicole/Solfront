import API from "../api/axios";

export const auth = async (email, password, setError) => {
  try {
    const response = await API.post("/auth/login", { email, password });

    if (response.data && response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      API.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
      return true;  // Éxito
    } else {
      setError("Respuesta inválida del servidor");
      return false;
    }
  } catch (err) {
    console.error("Error en el login:", err);

    if (err.response) {
      if (err.response.status === 401) {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      } else {
        setError(`Error ${err.response.status}: ${err.response.data.error || "Problema con la autenticación"}`);
      }
    } else if (err.request) {
      setError("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
      setError("Error al procesar la solicitud de inicio de sesión.");
    }

    return false;
  }
};


// Función para registrar un nuevo usuario
export const register = async (username, email, password, setError) => {
  try {
    const response = await API.post("/auth/register", { username, email, password });

    console.log("Respuesta del registro:", response.data);

    if (response.status === 201) {
      return true; // Registro exitoso
    } else {
      if (setError) setError("Respuesta inválida del servidor");
      return false;
    }
  } catch (err) {
    console.error("Error en el registro:", err);

    if (setError) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Error al registrar el usuario. Inténtalo de nuevo.");
      }
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
  delete API.defaults.headers.common["Authorization"];
};
