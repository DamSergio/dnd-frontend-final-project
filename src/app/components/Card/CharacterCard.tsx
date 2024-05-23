import { Link } from "react-router-dom";
import { Character } from "../../../types/Character";

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Link to={`/character/${character.id}`}>
      <div className="rounded-lg border-2 border-slate-700 bg-gray-600 h-96 flex flex-col justify-between items-center p-2 text-yellow-300 hover:border-yellow-300">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl">{character.name}</h1>
          <h1 className="text-2xl">Nivel: {character.level}</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={character.picture}
            alt="Character icon"
            className="h-[250px] w-[250px]"
          />
        </div>
        <h1 className="text-3xl">{character.character_class.name}</h1>
      </div>
    </Link>
  );
};

export default CharacterCard;
