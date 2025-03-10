// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import { auth } from "../services/authService";
import AuthForm from "../components/Form/AuthForm";
import Modal from "../components/Form/Modal";
import GoogleSignIn from "../components/Form/GoogleSingin";
import { createGoogleHandlers } from "../services/googleAuth"; // Importa tu función

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Llamas a la función para obtener handleGoogleSuccess y handleGoogleError
  const { handleGoogleSuccess, handleGoogleError } = createGoogleHandlers(navigate, setError);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Actualiza campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cierra el modal de error
  const onCloseError = () => setError("");

  // Login local
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const success = await auth(formData.email, formData.password, setError);
      if (success) {
        navigate("/model");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
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
        onChange={handleChange}
        error={error}
        onCloseError={onCloseError}
        googleSignInComponent={
          <GoogleSignIn onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        }
      />

      {error && <Modal error={error} onCloseError={onCloseError} />}
    </>
  );
};

export default Login;
