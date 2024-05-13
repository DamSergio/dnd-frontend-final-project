import React from "react";

import { Character } from "../../../../types/Character";

const CharacterInformation = ({ character }: { character: Character }) => {
  return (
    <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
      <div>
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:gap-4">
          <img
            src=""
            alt="character img"
            className="w-[200px] h-[200px] bg-black rounded-badge"
          />
          <div className="text-2xl">
            <p>Nombre: {character.name}</p>
            <p>Edad: {character.age}</p>
            <p>Genero: {character.gender}</p>
            <p>Nivel: {character.level}</p>
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default CharacterInformation;
