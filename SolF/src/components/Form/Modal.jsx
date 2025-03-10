import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const Modal = ({ onCloseError, error }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-md transition-opacity duration-200 ${error ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative bg-gradient-to-b from-[#00FFFF] to-[#0077FF] p-1 rounded-xl shadow-lg"
      >
        <div className="bg-gray-900 opacity-90 text-white rounded-lg px-6 py-5 max-w-md w-full flex flex-col items-center">
          <AlertCircle className="text-red-500 w-12 h-12 mb-3" />
          <h2 className="text-lg font-bold text-white">Error</h2>
          <p className="text-red-400 text-center mt-2">{error}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita que se propague el clic
              onCloseError();
            }}
            className="mt-4 px-4 py-2 bg-[#00FFFF] hover:bg-[#0077FF] text-gray-900 font-semibold rounded-md transition-all"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
