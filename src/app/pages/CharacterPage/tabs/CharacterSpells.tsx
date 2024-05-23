import React from "react";

import { Character } from "../../../../types/Character";

const CharacterSpells = ({ character }: { character: Character }) => {
  return (
    <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto overflow-x-hidden bg-base-300 p-2 rounded-t-md">
      <h1 className="text-2xl">Proficiencias</h1>
      <div className="divider" />
      <ul className="flex flex-col gap-4">
        <li>
          Armaduras: {character.armor_proficiencies.join(", ") || "ninguna"}
        </li>
        <li>Armas: {character.weapon_proficiencies.join(", ") || "ninguna"}</li>
        <li>
          Herramientas: {character.tool_proficiencies.join(", ") || "ninguna"}
        </li>
        <li>
          Habilidades:{" "}
          {character.skills.map((skill, index) => (
            <span key={index}>
              <span className="tooltip" data-tip={skill.description}>
                {skill.name}
              </span>
              {index < character.skills.length - 1 ? ", " : ""}
            </span>
          )) || "ninguna"}
        </li>
        <li>
          Rasgos:{" "}
          {character.traits.map((trait, index) => (
            <span key={index}>
              <span className="tooltip" data-tip={trait.description}>
                {trait.name}
              </span>
              {index < character.traits.length - 1 ? ", " : " "}
            </span>
          )) || "ninguna"}
        </li>
      </ul>
      <div className="divider" />
      <h1 className="text-2xl">Trucos</h1>
      <div className="divider" />
      <ul className="flex flex-col gap-1">
        {character.abilities.map((abilitie, index) => (
          <li key={index} className="p-4 bg-base-100 rounded-lg">
            {abilitie}
          </li>
        ))}
        {character.abilities.length === 0 && <p>Ninuno todavia</p>}
      </ul>
      <div className="divider" />
      <h1 className="text-2xl">Hechizos</h1>
      <div className="divider" />
      <ul className="flex flex-col gap-1">
        {character.spells.map((spell, index) => (
          <li key={index} className="p-4 bg-base-100 rounded-lg">
            {spell}
          </li>
        ))}
        {character.spells.length === 0 && <p>Ninuno todavia</p>}
      </ul>
    </div>
  );
};

export default CharacterSpells;
