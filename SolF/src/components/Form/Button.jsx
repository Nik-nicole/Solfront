import React from "react";

const Button = ({ text, onClick, className = "", type = "button" }) => {
  return (
    <button 
      type={type} 
      onClick={onClick}  
      className={`px-4 py-2 font-bold rounded-lg transition-colors ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
