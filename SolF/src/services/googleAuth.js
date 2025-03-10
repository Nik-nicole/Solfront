// services/googleAuth.js
import axios from "axios";

/**
 * Crea las funciones para manejar el éxito y error de Google Sign In,
 * reutilizables en Login.jsx y SignUp.jsx.
 *
 * @param {function} navigate - Hook useNavigate de React Router
 * @param {function} setError - Función para actualizar el estado de error en el componente
 * @returns {object} { handleGoogleSuccess, handleGoogleError }
 */
export function createGoogleHandlers(navigate, setError) {
  // Éxito de Google
  const handleGoogleSuccess = async (credential) => {
    console.log("Google credential:", credential);
    try {
      // Envías el token de Google a tu backend
      const response = await axios.post("http://localhost:5000/auth/google-login", {
        token: credential
      });

      // Si el backend responde con tu token local, lo guardas en localStorage
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/model");
      } else {
        setError("Error en la autenticación con Google");
      }
    } catch (error) {
      console.error("Error en Google sign in:", error);
      setError("Error en la autenticación con Google");
    }
  };

  // Error de Google
  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  return { handleGoogleSuccess, handleGoogleError };
}
