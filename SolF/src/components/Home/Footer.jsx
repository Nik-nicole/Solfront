import React from "react";

const Footer = () => {
    return (
        <>
            <footer className="relative bg-gray-900 text-gray-300 py-12 ">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-gray-900 "></div>

                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center relative z-10 mt-6">

                    <div className="flex items-center space-x-4 mt-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/LogoSENA.svg" alt="Logo SENA" className="h-16 w-auto" />
                        <p className="text-lg font-semibold">SENA - Servicio Nacional de Aprendizaje</p>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white">Contáctanos</h3>
                        <p>Email: contacto@sena.edu.co</p>
                        <p>Teléfono: +57 1 5461500</p>
                        <p>Dirección: Calle 57 No. 8 - 69, Bogotá, Colombia</p>
                    </div>

                    <div className="flex flex-col space-y-2 text-center md:text-left">
                        <a href="#" className="hover:text-white">Sol</a>
                        <a href="#" className="hover:text-white">Fábrica</a>
                        <a href="#" className="hover:text-white">Términos y Condiciones</a>
                        <a href="#" className="hover:text-white">Política de Privacidad</a>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    <p>&copy; 2024 SENA. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;
