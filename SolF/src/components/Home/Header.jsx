import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./../Form/Button.jsx"; 


const Header = ({ showAuthButtons = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full 
    bg-black/40 backdrop-blur-sm 
    mt-5 rounded-xl shadow-md 
    transition-transform duration-300 ease-in-out z-50 
    px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4"
  >
      <nav>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white text-3xl font-semibold">Sol</Link>

          {/* Menú hamburguesa (visible solo en móvil) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white p-2" 
            aria-label="Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex items-center justify-between gap-16 lg:gap-40 mx-auto">
            <Link to="#" className="text-white hover:text-gray-400">Modelos</Link>
            <Link to="#" className="text-white hover:text-gray-400">Doc</Link>
          </div>

          {/* Botones de autenticación */}
          {showAuthButtons && (
            <div className="flex items-center gap-4">
              <Link to="/signup">
                <Button 
                  text="Regístrate" 
                  className="bg-emerald-600 text-white hover:bg-[#6AD0B2]" 
                />
              </Link>
              <Link to="/login">
                <Button 
                  text="Inicia sesión" 
                  className="border-2 text-white hover:text-emerald-700" 
                />
              </Link>
            </div>
          )}
        </div>

        {/* Menú móvil */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 rounded-b-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full hidden"}`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link to="#" className="text-white hover:text-gray-400">Modelos</Link>
            <Link to="#" className="text-white hover:text-gray-400">Doc</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
