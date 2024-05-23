import { useState } from "react";
import { Character } from "../../../../types/Character";
import { Link, useParams } from "react-router-dom";
import useGetCharacters from "../../../hooks/useGetCharacters";
import { Helmet } from "react-helmet";
import Loader from "../../../components/Loader/Loader";
import { AxiosError } from "axios";
import { FetchError } from "../../../../types/FetchError";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../contexts/AuthContext";
import api from "../../../../utils/axios";
import { useCampaignContext } from "../components/CampaignContext";

const CampaignCharacters = () => {
  const { campaign } = useCampaignContext();
  const { authUser } = useAuthContext();
  const { addCharacter, loading: addLoading } = useAddCharacterToCampaign();
  const { characters: userCharacters, loading } = useGetCharacters();
  const [characterId, setCharacterId] = useState<string>("");
  const canAdd: boolean = canAddCharacter(
    campaign.players || [],
    userCharacters
  );
  const isDM = campaign?.dungeon_master === authUser.email;

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Personajes</title>
      </Helmet>
      <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
        <h1 className="text-3xl">Personajes</h1>
        <div className="divider" />
        <button
          className="btn btn-info mb-2"
          onClick={() =>
            (
              document.getElementById("addCharacter") as HTMLDialogElement
            ).showModal()
          }
          disabled={!canAdd || addLoading || isDM}
        >
          {addLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Añadir personaje"
          )}
        </button>
        <div className="flex flex-col gap-2">
          {campaign.players &&
            campaign.players.map((character) => (
              <Link to={`/character/${character.id}`} key={character.id}>
                <div className="flex flex-col p-2 bg-base-100 rounded-lg hover:bg-base-200 cursor-pointer gap-1">
                  <h2 className="text-xl font-semibold">{character.name}</h2>
                  <p>
                    Nivel: {character.level} - Clase:{" "}
                    {character.character_class.name}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <dialog id="addCharacter" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Elige tu personaje</h3>
          {loading && <p>Cargando...</p>}
          <div className="flex flex-col gap-2 my-2 overflow-y-auto">
            {!loading &&
              userCharacters.map((character) => (
                <button
                  key={character.id}
                  className={`btn ${
                    characterId === character.id
                      ? "border-1 border-yellow-400"
                      : ""
                  }`}
                  onClick={() => setCharacterId(character.id)}
                >
                  {character.name}
                </button>
              ))}
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-info"
                onClick={() => addCharacter(characterId)}
                disabled={addLoading || !characterId}
              >
                Aceptar
              </button>
              <button
                className="btn btn-error"
                onClick={() => setCharacterId("")}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

const canAddCharacter = (
  characters: Character[],
  userCharacters: Character[]
): boolean => {
  return (
    characters.filter((character) =>
      userCharacters.find((userCharacter) => userCharacter.id === character.id)
    ).length === 0
  );
};

const useAddCharacterToCampaign = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams() as { id: string };
  const { authUser } = useAuthContext();

  const addCharacter = async (characterId: string) => {
    setLoading(true);

    try {
      console.log(characterId);
      const response = await api.post(
        "campaign/add-character",
        {
          campaign_id: id,
          character_id: characterId,
        },
        { headers: { Authorization: `Bearer ${authUser.accessToken}` } }
      );

      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message || (error as Error).message);
    }

    setLoading(false);
  };

  return { addCharacter, loading };
};

export default CampaignCharacters;
