/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import MainContainer from "../../components/Containers/MainContainer";
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
import CharacterEdit from "./tabs/CharacterEdit";
import { Helmet } from "react-helmet";

export const CharacterPage = () => {
  const { id } = useParams() as { id: string };
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { character, loading, fetchError } = useFetchCharacter(id);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (tab !== "info" && tab !== "items" && tab !== "spells" && tab !== "edit")
      setSearchParams({ tab: "info" });

    if (
      tab === "edit" &&
      character.user !== authUser.id &&
      authUser.rol !== "admin"
    )
      setSearchParams({ tab: "info" });
  }, [tab, setSearchParams]);

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>{character.name}</title>
      </Helmet>
      <MainContainer>
        {!fetchError && !loading && tab === "info" && (
          <CharacterInformation character={character} />
        )}
        {!fetchError && !loading && tab === "items" && (
          <CharacterItems character={character} />
        )}
        {!fetchError && !loading && tab === "spells" && (
          <CharacterSpells character={character} />
        )}
        {!fetchError && !loading && tab === "edit" && (
          <CharacterEdit character={character} />
        )}
        {fetchError && !loading && (
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
          {(authUser.id === character.user || authUser.rol === "admin") && (
            <button
              onClick={() => setSearchParams({ tab: "edit" })}
              className={`rounded-b-md ${tab === "edit" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
        </div>
      </MainContainer>
    </>
  );
};
