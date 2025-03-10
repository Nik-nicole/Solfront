import React, { useState } from "react";
import { Cat, UserRound, Apple } from "lucide-react";
import ToolbarButton from "./ToolbarButton";

const buttons = [
  { id: "cat", icon: Cat, title: "Gato - Animal", label: "Animales" },
  { id: "user", icon: UserRound, title: "Usuario - Persona", label: "Palabras Base" },
  { id: "apple", icon: Apple, title: "Manzana - Fruta", label: "Frutas" },
];

const Toolbar = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex justify-center items-center gap-6 w-96 h-28 rounded-full bg-white p-6 shadow-lg">
        {buttons.map((btn) => (
          <ToolbarButton
            key={btn.id}
            {...btn}
            isSelected={selected === btn.id}
            onClick={() => setSelected(btn.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
