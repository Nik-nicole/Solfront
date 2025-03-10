// SignUp.jsx
import React, { useState } from "react";
import AuthForm from "../components/Form/AuthForm";
import Sign from "../assets/Sign.jpg";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import GoogleSignIn from "../components/Form/GoogleSingin";
import { createGoogleHandlers } from "../services/googleAuth"; // Importa tu función

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Reutiliza la misma lógica de Google
  const { handleGoogleSuccess, handleGoogleError } = createGoogleHandlers(navigate, setError);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    console.log("handleChange - campo:", e.target.name, "valor:", e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onCloseError = () => setError("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    console.log("handleRegister - Datos del formulario:", formData);

    try {
      const success = await register(formData.username, formData.email, formData.password, setError);
      console.log("handleRegister - Respuesta de register:", success);

      if (success) {
        navigate("/model");
      } else {
        console.warn("handleRegister - Registro fallido");
      }
    } catch (error) {
      console.error("handleRegister - Error en el registro:", error);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <AuthForm
      title="Bienvenido a Sol"
      subtitle="Ingresa la información para registrarte"
      inputs={[
        { type: "text", name: "username", placeholder: "Name", value: formData.username },
        { type: "email", name: "email", placeholder: "Email", value: formData.email },
        { type: "password", name: "password", placeholder: "Contraseña", value: formData.password }
      ]}
      buttonText="Registrar"
      links={[
        { linkHref: "/login", linkText: "¿Ya tienes una cuenta? Inicia sesión" },
        { linkHref: "/", linkText: "" }
      ]}
      linkImg={Sign}
      handleLogin={handleRegister}
      onChange={handleChange}
      error={error}
      onCloseError={onCloseError}
      googleSignInComponent={
        <GoogleSignIn
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      }
    />
  );
};

export default SignUp;
