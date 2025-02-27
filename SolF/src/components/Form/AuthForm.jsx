import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "./Button";
import Input from "./Inputs";
import NavLinks from "./NavLinks";
import { Modal } from "./Modal";

const AuthForm = ({
  title,
  subtitle,
  inputs,
  buttonText,
  linkImg,
  links,
  handleLogin,
  onChange,
  error,         // Nuevo prop para el mensaje de error
  onCloseError   // Función para cerrar el modal (opcional)
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Modal de error */}
      {error && (
        <Modal
            onCloseError={onCloseError}
            error={error}
        />
      )}

      <div className="flex min-h-screen">
        {/* Logo y título */}
        <div>
          <div className="absolute flex items-center top-5 left-5">
            <img
              src="/src/assets/hands.png"
              alt="Logo"
              className="opacity-75 object-cover w-20 h-20 rounded-full mr-2"
            />
            <a href="/" className="text-xl font-medium">Sol</a>
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-[#F0F0F0]">
          <div className="max-w-sm mx-auto w-full space-y-6">
            {/* Título y subtítulo */}
            <div>
              <h1 className="text-2xl font-semibold mb-1">{title}</h1>
              <p className="text-gray-500">{subtitle}</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleLogin} className="w-full max-w-sm mx-auto space-y-6">
              {inputs.map((input, index) => (
                <div key={index} className="relative">
                  <Input
                    type={
                      input.type === "password" && showPassword
                        ? "text"
                        : input.type
                    }
                    name={input.name}             // Nombre del campo
                    valueInput={input.value}       // Valor del campo
                    placeholder={input.placeholder}
                    onChange={onChange}            // Handler que actualiza el estado
                    className="w-full p-3 border-b border-gray-300 focus:outline-none focus:border-emerald-400"
                  />
                  {input.type === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  )}
                </div>
              ))}

              {/* Botón de acción */}
              <Button
                text={buttonText}
                type="submit" // Se asegura que el botón sea de tipo submit
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-white py-2 rounded-md transition-colors"
              />
            </form>

            {/* Enlaces */}
            <div className="text-center text-sm text-gray-500">
              {links.map((link, index) => (
                <div key={index} className="mt-2">
                  <NavLinks linkHref={link.linkHref} linkText={link.linkText} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Imagen de fondo */}
        <div className="hidden lg:block lg:w-[60%] bg-[#F0F0F0] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={linkImg}
              alt="Imagen de fondo"
              className="relative w-[60%] h-full object-cover -rotate-90 rounded-tr-[100px] rounded-bl-[100px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;