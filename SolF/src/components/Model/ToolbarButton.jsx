import React from "react";

const ToolbarButton = ({ id, icon: Icon, title, label, isSelected, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`w-16 h-16 flex justify-center items-center rounded-full border transition-all duration-300 ease-in-out
          ${
            isSelected
              ? " border-emerald-400 ring-1 ring-emerald-400"
              : "bg-white border-gray-400 hover:bg-emerald-200 hover:border-emerald-400 hover:ring-2 hover:ring-emerald-300"
          }`}
        type="button"
        onClick={onClick}
        title={title}
      >
        {Icon && <Icon className="w-8 h-8 text-gray-700" />}
      </button>
      <span className="pt-2 text-sm text-gray-700">{label}</span>
    </div>
  );
};

export default ToolbarButton;
