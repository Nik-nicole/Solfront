import React from "react";
import AuthForm from "../components/Form/AuthForm";
import Sign from "../assets/Sign.jpg"

const SignUp =()=>{
    return (
        <AuthForm
    title="Bienvenido a Sol"
    subtitle="Ingresa la información para registrate "
    inputs={[
        { type: "Text", placeholder:"Name"},
      { type: "email", placeholder: "Email" },
      { type: "password", placeholder: "Contraseña" }
    ]}
    buttonText="Registrar"
    links={
      [
        {linkHref: "/login", linkText: "¿Ya tienes una cuenta?inicia sesion"},
        {linkHref: "/", linkText: ""}
      ]
    }       
    linkImg={Sign}
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Registrando ..");
    }}
  />
    )
}

export default SignUp;