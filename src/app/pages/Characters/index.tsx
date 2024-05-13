import { useEffect, useState } from "react";

import MainContainer from "../../components/Containers/MainContainer";
import { SearchIcon } from "../../components/Icons/Icons";
import NewCharacterCard from "../../components/Card/NewCharacterCard";
import useGetCharacters from "../../hooks/useGetCharacters";
import Loader from "../../components/Loader/Loader";
import CharacterCard from "../../components/Card/CharacterCard";
import { useSearchParams } from "react-router-dom";

export const Characters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { filteredCharacters, loading } = useFilterCharacters(searchQuery);

  return (
    <>
      {loading && <Loader />}
      <MainContainer>
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
            Personajes
          </h1>
          <div className="divider" />
          <div className="flex-1 w-full flex flex-col justify-center items-center">
            <div className="w-full lg:w-2/3 mb-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Nombre"
                  value={searchQuery}
                  onChange={(e) => setSearchParams({ search: e.target.value })}
                />
                <SearchIcon />
              </label>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center w-full lg:w-2/3 h-full">
              <div className="w-full h-full flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {!loading &&
                  filteredCharacters.map((character, index) => (
                    <CharacterCard key={index} character={character} />
                  ))}
                <NewCharacterCard />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

const useFilterCharacters = (searchQuery: string) => {
  const { characters, loading } = useGetCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, characters]);

  return { filteredCharacters, loading };
};
