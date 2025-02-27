import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg"; // Asegúrate de tener la ruta correcta
import { auth } from "../services/authService"; // Importa tu función de autenticación
import AuthForm from "../components/Form/AuthForm";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Estado que almacena los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  // Handler para actualizar el estado de cada input
  const handleChange = (e) => {
    console.log("handleChange - Campo:", e.target.name, "Valor:", e.target.value);e
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onCloseError = () => setError("")
  
  // Maneja el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("handleLogin - Datos del formulario:", formData);
  
    const { email, password } = formData;
  
    try {
      const success = await auth(email, password);
      console.log("handleLogin - Respuesta de auth:", success);
      if (success) {
        navigate("/model");
      } else {
        console.warn("handleLogin - Autenticación fallida");
        setError("Autenticación fallida");
      }
    } catch (error) {
      console.error("handleLogin - Error en la autenticación:", error);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <>      
      <AuthForm
        title="Bienvenido de nuevo a Sol"
        subtitle="Ingresa la información"
        inputs={[
          { type: "email", name: "email", placeholder: "Email", value: formData.email },
          { type: "password", name: "password", placeholder: "Contraseña", value: formData.password }
        ]}
        buttonText="Ingresar"
        links={[
          { linkHref: "/sign", linkText: "¿Ya tienes una cuenta? Regístrate" },
          { linkHref: "/", linkText: "¿Olvidaste tu contraseña?" }
        ]}
        linkImg={login}
        handleLogin={handleLogin}
        onChange={handleChange}  // Se pasa el handler para actualizar el estado        
        error={error}            // Prop para mostrar el error en el modal
        onCloseError={onCloseError} // Función para cerrar el modal de error
      />
    </>
  );
};

export default Login;