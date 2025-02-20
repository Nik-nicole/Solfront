import React from "react";
import hands from '../../assets/hands.png'

const Welcome = () => {
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
        <h1 className="text-7xl font-bold text-neutral-700  mb-2">Sol</h1>

        {/* Subtitle */}
        <p className="text-xl text-neutral-700  mb-8">
          Our AI model about Colombian signs
        </p>

        {/* CTA Button */}
        <button className="px-6 py-2 border-2 border-customGray bg-gray-200 bg-opacity-50 text-neutral-700  rounded-xl hover:bg-gray-200 transition-colors">
          See more
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce"></div>
      </main>
    </div>
  );
};

export default Welcome;
