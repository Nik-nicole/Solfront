import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import technologies from './DataTools.jsx';
import TechnologyCard from './TechCard.jsx';

export default function Tools() {
  const [current, setCurrent] = useState(2);
  const [isInteracting, setIsInteracting] = useState(false);

  const next = () => {
    setCurrent((c) => (c + 1) % technologies.length);
    resetTimer();
  };

  const prev = () => {
    setCurrent((c) => (c - 1 + technologies.length) % technologies.length);
    resetTimer();
  };

  const resetTimer = () => {
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 5000); // 5 segundos sin interacción
  };

  useEffect(() => {
    if (!isInteracting) {
      const interval = setInterval(() => {
        setCurrent((c) => (c + 1) % technologies.length);
      }, 4000); // Se mueve cada 4 segundos

      return () => clearInterval(interval);
    }
  }, [isInteracting]);

  return (
    <div className="min-h-150 bg-black flex flex-col items-center justify-center overflow-hidden relative ">
      {/* Contenedor principal con perspectiva */}
      <div className="relative w-full flex items-center justify-center" style={{ perspective: '1500px' }}>
        
        {/* Botón izquierdo */}
        <button
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/50 text-blue-400 hover:text-blue-300 transition-all duration-300"
          onClick={prev}
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {/* Carrusel */}
        <div className="relative w-full py-32 flex items-center justify-center">
          {technologies.map((tech, index) => {
            const distance = ((index - current + technologies.length) % technologies.length);
            const normalizedDistance = distance > technologies.length / 2 ? distance - technologies.length : distance;
            const isCenter = distance === 0;
            const absDistance = Math.abs(normalizedDistance);

            return (
              <TechnologyCard
                key={tech.name}
                tech={tech}
                isCenter={isCenter}
                style={{
                  transform: `
                    translateX(${normalizedDistance * 60}%)
                    translateZ(${-absDistance * 100}px)
                    rotateY(${normalizedDistance * 25}deg)
                    scale(${1 - absDistance * 0.15})
                  `,
                  zIndex: technologies.length - absDistance,
                  opacity: 1 - absDistance * 0.3,
                  cursor: isCenter ? 'default' : 'pointer',
                }}
                onClick={() => {
                  setCurrent(index);
                  resetTimer();
                }}
              />
            );
          })}
        </div>

        {/* Botón derecho */}
        <button
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/50 text-blue-400 hover:text-blue-300 transition-all duration-300"
          onClick={next}
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-3">
        {technologies.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-blue-400 shadow-[0_0_15px_3px_rgba(59,130,246,0.5)]'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={() => {
              setCurrent(i);
              resetTimer();
            }}
          />
        ))}
      </div>
    </div>
  );
}
