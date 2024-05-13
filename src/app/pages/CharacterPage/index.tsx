import React, { useEffect } from "react";

import MainContainer from "../../components/Containers/MainContainer";
import { Character } from "../../../types/Character";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPerson,
  faToolbox,
  faWandMagic,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useSearchParams } from "react-router-dom";
import CharacterInformation from "./tabs/CharacterInformation";
import CharacterItems from "./tabs/CharacterItems";
import CharacterSpells from "./tabs/CharacterSpells";
import useFetchCharacter from "../../hooks/useFetchCharacter";
import Loader from "../../components/Loader/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";

export const CharacterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { id } = useParams() as { id: string };
  const { character, loading, fetchError } = useFetchCharacter(id);
  const { authUser } = useAuthContext();
  console.log(character);

  useEffect(() => {
    if (tab !== "info" && tab !== "items" && tab !== "spells")
      setSearchParams({ tab: "info" });
  }, [tab, setSearchParams]);

  return (
    <>
      {loading && <Loader />}
      <MainContainer>
        {!fetchError && tab === "info" && (
          <CharacterInformation character={character} />
        )}
        {!fetchError && tab === "items" && <CharacterItems />}
        {!fetchError && tab === "spells" && <CharacterSpells />}
        {fetchError && (
          <div className="flex flex-col h-full w-full lg:w-2/4 justify-center items-center overflow-y-auto">
            {fetchError}
          </div>
        )}

        <div className="btm-nav lg:w-2/4 static rounded-b-md">
          <button
            onClick={() => setSearchParams({ tab: "info" })}
            className={`rounded-b-md ${tab === "info" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faPerson} />
          </button>
          <button
            onClick={() => setSearchParams({ tab: "items" })}
            className={`rounded-b-md ${tab === "items" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faToolbox} />
          </button>
          <button
            onClick={() => setSearchParams({ tab: "spells" })}
            className={`rounded-b-md ${tab === "spells" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faWandMagic} />
          </button>
          {authUser.id === character.user && (
            <button
              onClick={() => setSearchParams({ tab: "spells" })}
              className={`rounded-b-md ${tab === "spells" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
        </div>
      </MainContainer>
    </>
  );
};
