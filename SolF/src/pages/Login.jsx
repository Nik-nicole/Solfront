import React, { useState } from "react";
import AuthForm from "../components/Form/AuthForm";
import login from "../assets/login.jpg"

const Login = () => {  

  return (
    <AuthForm
    title="Bienvenido de nuevo a Sol"
    subtitle="Ingresa la información"
    inputs={[
      { type: "email", placeholder: "Email" },
      { type: "password", placeholder: "Contraseña" }
    ]}
    buttonText="Ingresar"    
    links={
          [
            {linkHref: "/sign", linkText: "¿Ya tienes una cuenta?, Registrate"},
            {linkHref: "/", linkText: "Olvisdaste tu contraseña"}
          ]
        }
    linkImg={login}
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Iniciando sesión...");
    }}
  />
  );
};

export default Login;
