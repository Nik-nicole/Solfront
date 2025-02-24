import React, { useState } from "react";
import AuthForm from "../components/Form/AuthForm";

const Form = () => {  

  return (
    <AuthForm
    title="Bienvenido de nuevo a Sol"
    subtitle="Ingresa la información"
    inputs={[
      { type: "email", placeholder: "Email" },
      { type: "password", placeholder: "Contraseña" }
    ]}
    buttonText="Ingresar"
    linkText="¿No tienes una cuenta? Regístrate Gratis"
    linkHref="/register"
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Iniciando sesión...");
    }}
  />
  );
};

export default Form;
