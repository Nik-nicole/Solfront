import React from "react";

const Input = ({ placeholder = "Escribe aquí...", className = "", type = "text", onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`px-4 py-2 border-b-1 border-gray-300 ${className}`}
    />
  );
};

export default Input;
