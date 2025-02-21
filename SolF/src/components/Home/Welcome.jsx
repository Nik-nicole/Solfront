import React from "react";
import hands from '../../assets/hands.png';
import Button from "./../Form/Button.jsx";  // Importamos el botón

const Welcome = () => {
  // Función para manejar el clic en el botón
  const handleClick = () => {
    console.log("Botón presionado");
    // Aquí puedes agregar lógica, como navegación o abrir un modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D6ECD7] via-emerald-100 to-emerald-400">
      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center text-center px-4 pt-20 pb-40">
        {/* Logo */}
        <div className="p-6 rounded-full mt-10">
          <img
            src={hands}
            alt="Hands"
            style={{ opacity: 0.75 }}
            className="w-72 h-72 object-cover rounded-full mr-10"
          />
        </div>

        {/* Title */}
        <h1 className="text-7xl font-bold text-neutral-700 mb-2">Sol</h1>

        {/* Subtitle */}
        <p className="text-xl text-neutral-700 mb-8">
          Nuestro modelo de AI en Lengua de Señas Colombiano
        </p>

        {/* CTA Button usando el componente Button */}
        <Button 
          text="Ver más" 

          className="px-6 py-2 border-2 border-gray-400 bg-gray-200 text-neutral-700 rounded-xl hover:bg-gray-300 transition-colors"
        />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce"></div>
      </main>
    </div>
  );
};

export default Welcome;
