import React from "react";

import { Character } from "../../../../types/Character";

const CharacterItems = ({ character }: { character: Character }) => {
  return (
    <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
      <h1 className="text-2xl">Objectos</h1>
      <div className="divider" />
      <ul>
        {character.items.map((item, index) => (
          <li key={index}>
            {item.quantity}x {item.name}
          </li>
        ))}
      </ul>
      <div className="divider" />
      <div className="grid grid-cols-5">
        <div className="flex flex-col justify-center items-center">
          <p>cp</p>
          <div className="divider" />
          <p>{character.coins.cp}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>sp</p>
          <div className="divider" />
          <p>{character.coins.sp}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>ep</p>
          <div className="divider" />
          <p>{character.coins.ep}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>gp</p>
          <div className="divider" />
          <p>{character.coins.gp}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>pp</p>
          <div className="divider" />
          <p>{character.coins.pp}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterItems;
