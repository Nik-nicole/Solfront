// src/components/Form/Inputs.jsx
import React from "react";

const Input = ({
  placeholder = "Escribe aquí...",
  className = "",
  type = "text",
  onChange,
  name,
  valueInput
}) => {
  return (
    <input
      type={type}
      value={valueInput} // Valor controlado
      placeholder={placeholder}
      onChange={onChange} // Se actualiza en el componente padre
      name={name}       // Identificador para el handler
      className={`px-4 py-2 border-b border-gray-300 ${className}`}
    />
  );
};

export default Input;
