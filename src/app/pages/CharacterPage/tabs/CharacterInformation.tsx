import { Character } from "../../../../types/Character";

const CharacterInformation = ({ character }: { character: Character }) => {
  const consModifier =
    character.stats.con > 10
      ? Math.floor((character.stats.con - 10) / 2)
      : Math.floor((character.stats.con - 10) / -2);
  const maxHp =
    character.hit_points_base +
    (character.level - 1) * character.hit_points_per_level +
    consModifier;

  return (
    <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
      <div>
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start md:gap-4">
          <img
            src={character.picture}
            alt="character img"
            className="w-[200px] h-[200px] rounded-badge"
          />
          <div className="text-2xl">
            <p>
              <strong>Nombre:</strong> {character.name}
            </p>
            <p>
              <strong>Edad:</strong> {character.age}
            </p>
            <p>
              <strong>Genero:</strong> {character.gender}
            </p>
            <p>
              <strong>Nivel:</strong> {character.level}
            </p>
            <p>
              <strong>Tiradas de Salvacion:</strong>{" "}
              {character.saving_throws.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <p className="text-xl">
          HP: {character.hit_points}/{maxHp}
        </p>
        <p className="text-xl">AC: {character.armor_class}</p>
        <p className="text-xl">Velocidad: {character.speed}</p>
      </div>

      <div className="divider" />

      <div>
        <p className="text-xl">Raza: {character.character_race.name}</p>
        <p className="text-xl">Clase: {character.character_class.name}</p>
        <p className="text-xl">Transfondo: {character.background}</p>
        <p className="text-xl">Alineamiento: {character.alignment}</p>
        <p className="text-xl">Idiomas: {character.languages.join(", ")}</p>
      </div>

      <div className="divider" />

      <div className="grid grid-cols-6">
        <div className="flex flex-col justify-center items-center">
          <p>str</p>
          <div className="divider" />
          <p>{character.stats.str}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>dex</p>
          <div className="divider" />
          <p>{character.stats.dex}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>con</p>
          <div className="divider" />
          <p>{character.stats.con}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>int</p>
          <div className="divider" />
          <p>{character.stats.int}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>wis</p>
          <div className="divider" />
          <p>{character.stats.wis}</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p>cha</p>
          <div className="divider" />
          <p>{character.stats.cha}</p>
        </div>
      </div>

      <div className="divider" />

      <div className="flex flex-col gap-1">
        <div className="h-auto mx-2 p-2 border bg-base-100 border-black rounded-xl flex flex-col">
          <label>Rasgos:</label>
          <p className="w-full break-words">{character.personality_traits}</p>
        </div>
        <div className="h-auto mx-2 p-2 border bg-base-100 border-black rounded-xl flex flex-col">
          <label>Ideales:</label>
          <p className="w-full break-words">{character.ideals}</p>
        </div>
        <div className="h-auto mx-2 p-2 border bg-base-100 border-black rounded-xl flex flex-col">
          <label>Lazos:</label>
          <p className="w-full break-words">{character.bonds}</p>
        </div>
        <div className="h-auto mx-2 p-2 border bg-base-100 border-black rounded-xl flex flex-col">
          <label>Defectos:</label>
          <p className="w-full break-words">{character.flaws}</p>
        </div>
        <div className="h-auto mx-2 p-2 border bg-base-100 border-black rounded-xl flex flex-col">
          <label>Historia:</label>
          <p className="w-full break-words">{character.history}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInformation;
