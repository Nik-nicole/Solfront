export default function TechnologyCard({ tech, isCenter, style, onClick }) {
    return (
      <div
        className="absolute w-[300px] md:w-[400px] aspect-[3/4] transition-all duration-500"
        style={style}
        onClick={onClick} // Agregar la acción al hacer clic
      >
        <div
          className={`
            w-full h-[350px] rounded-xl transition-all duration-500 relative overflow-hidden border-2
            ${isCenter ? 'bg-black shadow-[0_0_50px_10px_rgba(59,130,246,0.5)] border-blue-500/50' : 'bg-gray-900 border-gray-700'}
            hover:shadow-[0_0_50px_10px_rgba(59,130,246,0.7)]
            hover:border-blue-400/70
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl transition-all duration-500"></div>
          <div className="p-6 relative z-10 flex flex-col items-center">
            <img src={tech.image} alt={tech.name} className="w-24 h-24 mb-4 object-contain" />
            <h3 className="text-2xl font-bold text-white mb-4 text-center">{tech.name}</h3>
            <p className="text-lg text-blue-400 font-semibold text-center">{tech.description}</p>
          </div>
        </div>
      </div>
    );
  }
  