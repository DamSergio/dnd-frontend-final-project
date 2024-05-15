/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";

import { Character } from "../../../../types/Character";
import api from "../../../../utils/axios";
import { AxiosError } from "axios";
import { FetchError } from "../../../../types/FetchError";
import { useAuthContext } from "../../../../contexts/AuthContext";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { PlusIcon } from "../../../components/Icons/Icons";

const CharacterEdit = ({ character }: { character: Character }) => {
  const { authUser } = useAuthContext();
  const { savePicture, loading: pictureLoading } = useSavePicture();
  const { saveLanguages, loading: languagesLoading } = useSaveLanguages();
  const { saveCharacteristics, loading: characteristicsLoading } =
    useSaveCharacteristics();
  const { saveStats, loading: statsLoading } = useSaveStats();
  const { savePersonality, loading: personalityLoading } = useSavePersonality();

  const [maxHp, setMaxHp] = useState<number>(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [languages, setLanguages] = useState<string[]>(character.languages);
  const [characteristics, setCharacteristics] = useState({
    level: character.level,
    hp: character.hit_points,
    ac: character.armor_class,
    speed: character.speed,
  });
  const [stats, setStats] = useState(character.stats);

  const newLanguageRef = useRef<HTMLInputElement>(null);
  const traitsRef = useRef<HTMLTextAreaElement>(null);
  const idealsRef = useRef<HTMLTextAreaElement>(null);
  const bondsRef = useRef<HTMLTextAreaElement>(null);
  const flawsRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const consModifier =
      character.stats.con > 10
        ? Math.floor((character.stats.con - 10) / 2)
        : Math.floor((character.stats.con - 10) / -2);
    const maxHp =
      character.hit_points_base +
      (characteristics.level - 1) * character.hit_points_per_level +
      consModifier;

    setMaxHp(maxHp);
    setCharacteristics({ ...characteristics, hp: maxHp });
  }, [characteristics.level]);

  const handleAddLanguage = () => {
    const newLanguage = newLanguageRef.current?.value;

    if (newLanguage) {
      setLanguages([...languages, newLanguage]);
      newLanguageRef.current!.value = "";
    }
  };

  const handleDeleteLanguage = (language: string) => {
    setLanguages(languages.filter((lang) => lang !== language));
  };

  return (
    <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 px-6 rounded-t-md">
      <h1 className="text-2xl">Editar Personaje</h1>
      <div className="divider" />
      {/* Imagen */}
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <img
            src={picture ? URL.createObjectURL(picture) : character.picture}
            alt="character img"
            className="w-[200px] h-[200px] bg-black rounded-badge"
          />
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => {
              setPicture(e.target.files?.[0] || null);
            }}
          />
        </div>
        <button
          className="btn btn-success w-full mt-4"
          disabled={pictureLoading}
          onClick={() => {
            savePicture(picture as File, character.id, authUser.accessToken);
            character.picture = URL.createObjectURL(picture as File);
          }}
        >
          {pictureLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Guardar imagen"
          )}
        </button>
      </div>

      <div className="divider" />
      {/* Idiomas */}
      <div>
        <h1 className="text-xl mb-2">Idiomas:</h1>
        <div className="flex justify-center my-2 gap-2">
          <input
            type="text"
            className="w-full md:w-1/2 input input-bordered"
            ref={newLanguageRef}
          />
          <button
            className="btn btn-info flex justify-center tooltip"
            data-tip="Añadir idioma"
            onClick={handleAddLanguage}
          >
            <PlusIcon />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {languages.map((language, index) => (
            <div
              key={index}
              className="rounded-xl flex justify-between items-center p-2 bg-base-100"
            >
              <p className="ml-4">{language}</p>
              <button
                className="btn btn-error tooltip"
                data-tip="Borrar"
                onClick={() => handleDeleteLanguage(language)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn btn-success w-full mt-4"
          onClick={() => {
            saveLanguages(languages, character.id, authUser.accessToken);
            character.languages = languages;
          }}
        >
          {languagesLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Guardar idiomas"
          )}
        </button>
      </div>

      <div className="divider" />
      {/* Caracteristicas */}
      <div>
        <h1 className="text-xl mb-2">Caracteristicas:</h1>
        {/* Nivel */}
        <div className="flex flex-col gap-2">
          <label className="label">Nivel</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.level <= 1) return;

                setCharacteristics({
                  ...characteristics,
                  level: characteristics.level - 1,
                });
              }}
            >
              -
            </button>
            <input
              className="input w-full text-center"
              type="text"
              value={characteristics.level}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.level >= 20) return;

                setCharacteristics({
                  ...characteristics,
                  level: characteristics.level + 1,
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* HP */}
        <div className="flex flex-col gap-2">
          <label className="label">HP</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.hp <= 1) return;

                setCharacteristics({
                  ...characteristics,
                  hp: characteristics.hp - 1,
                });
              }}
            >
              -
            </button>
            <input
              className="input w-full text-center"
              type="text"
              value={`${characteristics.hp}/${maxHp}`}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.hp >= maxHp) return;

                setCharacteristics({
                  ...characteristics,
                  hp: characteristics.hp + 1,
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* AC */}
        <div className="flex flex-col gap-2">
          <label className="label">AC</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.ac <= 0) return;

                setCharacteristics({
                  ...characteristics,
                  ac: characteristics.ac - 1,
                });
              }}
            >
              -
            </button>
            <input
              className="input w-full text-center"
              type="text"
              value={characteristics.ac}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setCharacteristics({
                  ...characteristics,
                  ac: characteristics.ac + 1,
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* Velocidad */}
        <div className="flex flex-col gap-2">
          <label className="label">Velocidad</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (characteristics.speed <= 0) return;

                setCharacteristics({
                  ...characteristics,
                  speed: characteristics.speed - 5,
                });
              }}
            >
              -
            </button>
            <input
              className="input w-full text-center"
              type="text"
              value={characteristics.speed}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setCharacteristics({
                  ...characteristics,
                  speed: characteristics.speed + 5,
                });
              }}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="btn btn-success w-full mt-4"
          onClick={() => {
            saveCharacteristics(
              characteristics,
              character.id,
              authUser.accessToken
            );
            character.level = characteristics.level;
            character.hit_points = characteristics.hp;
            character.armor_class = characteristics.ac;
            character.speed = characteristics.speed;
          }}
        >
          {characteristicsLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Guardar caracteristicas"
          )}
        </button>
      </div>

      <div className="divider" />
      {/* Estadisticas */}
      <div>
        <h1 className="text-xl mb-2">Estadisticas:</h1>
        {/* str */}
        <div className="flex flex-col gap-2">
          <label className="label">Str</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.str <= 8) return;

                setStats({ ...stats, str: stats.str - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.str}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, str: stats.str + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* dex */}
        <div className="flex flex-col gap-2">
          <label className="label">Dex</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.dex <= 8) return;

                setStats({ ...stats, dex: stats.dex - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.dex}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, dex: stats.dex + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* con */}
        <div className="flex flex-col gap-2">
          <label className="label">Con</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.con <= 8) return;

                setStats({ ...stats, con: stats.con - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.con}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, con: stats.con + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* int */}
        <div className="flex flex-col gap-2">
          <label className="label">Int</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.int <= 8) return;

                setStats({ ...stats, int: stats.int - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.int}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, int: stats.int + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* wis */}
        <div className="flex flex-col gap-2">
          <label className="label">Wis</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.wis <= 8) return;

                setStats({ ...stats, wis: stats.wis - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.wis}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, wis: stats.wis + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* cha */}
        <div className="flex flex-col gap-2">
          <label className="label">Cha</label>
          <div className="w-full flex gap-2">
            <button
              className="btn btn-info w-16"
              onClick={() => {
                if (stats.cha <= 8) return;

                setStats({ ...stats, cha: stats.cha - 1 });
              }}
            >
              -
            </button>
            <input
              className="input w-full flex text-center"
              type="text"
              value={stats.cha}
              readOnly
            />
            <button
              className="btn btn-info w-16"
              onClick={() => {
                setStats({ ...stats, cha: stats.cha + 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="btn btn-success w-full mt-4"
          onClick={() => {
            saveStats(stats, character.id, authUser.accessToken);
            character.stats = stats;
          }}
        >
          {statsLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Guardar estadisticas"
          )}
        </button>
      </div>

      <div className="divider" />
      {/* Personalidad */}
      <div>
        <h1 className="text-xl mb-2">Personalidad:</h1>
        {/* Rasgos */}
        <div className="flex flex-col gap-2">
          <label className="label">Rasgos</label>
          <textarea
            ref={traitsRef}
            defaultValue={character.personality_traits}
            className="textarea textarea-bordered resize-none overflow-y-auto h-24"
          />
        </div>
        {/* Ideales */}
        <div className="flex flex-col gap-2">
          <label className="label">Ideales</label>
          <textarea
            ref={idealsRef}
            defaultValue={character.ideals}
            className="textarea textarea-bordered resize-none overflow-y-auto h-24"
          />
        </div>
        {/* Lazos */}
        <div className="flex flex-col gap-2">
          <label className="label">Lazos</label>
          <textarea
            ref={bondsRef}
            defaultValue={character.bonds}
            className="textarea textarea-bordered resize-none overflow-y-auto h-24"
          />
        </div>
        {/* Defectos */}
        <div className="flex flex-col gap-2">
          <label className="label">Defectos</label>
          <textarea
            ref={flawsRef}
            defaultValue={character.flaws}
            className="textarea textarea-bordered resize-none overflow-y-auto h-24"
          />
        </div>
        {/* Historia */}
        <div className="flex flex-col gap-2">
          <label className="label">Historia</label>
          <textarea
            ref={historyRef}
            defaultValue={character.history}
            className="textarea textarea-bordered resize-none overflow-y-auto h-24"
          />
        </div>
      </div>
      <button
        className="btn btn-success w-full mt-4"
        onClick={() => {
          savePersonality(
            traitsRef.current?.value || "",
            idealsRef.current?.value || "",
            bondsRef.current?.value || "",
            flawsRef.current?.value || "",
            historyRef.current?.value || "",
            character.id,
            authUser.accessToken
          );
          character.personality_traits = traitsRef.current?.value || "";
          character.ideals = idealsRef.current?.value || "";
          character.bonds = bondsRef.current?.value || "";
          character.flaws = flawsRef.current?.value || "";
          character.history = historyRef.current?.value || "";
        }}
      >
        {personalityLoading ? (
          <span className="loading loading-spinner" />
        ) : (
          "Guardar personalidad"
        )}
      </button>
    </div>
  );
};

// HOOKS
const useSavePicture = () => {
  const [loading, setLoading] = useState(false);

  const savePicture = async (
    picture: File,
    characterId: string,
    accessToken: string
  ) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `/character/${characterId}/picture`,
        { picture: picture },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { savePicture, loading };
};

const useSaveLanguages = () => {
  const [loading, setLoading] = useState(false);

  const saveLanguages = async (
    languages: string[],
    characterId: string,
    accessToken: string
  ) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `/character/${characterId}/languages`,
        { languages: languages },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { saveLanguages, loading };
};

const useSaveCharacteristics = () => {
  const [loading, setLoading] = useState(false);

  const saveCharacteristics = async (
    characteristics: { level: number; hp: number; ac: number; speed: number },
    characterId: string,
    accessToken: string
  ) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `/character/${characterId}/characteristics`,
        { ...characteristics },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { saveCharacteristics, loading };
};

const useSaveStats = () => {
  const [loading, setLoading] = useState(false);

  const saveStats = async (
    stats: {
      str: number;
      dex: number;
      con: number;
      int: number;
      wis: number;
      cha: number;
    },
    characterId: string,
    accessToken: string
  ) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `/character/${characterId}/stats`,
        { ...stats },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { saveStats, loading };
};

const useSavePersonality = () => {
  const [loading, setLoading] = useState(false);

  const savePersonality = async (
    traits: string,
    ideals: string,
    bonds: string,
    flaws: string,
    history: string,
    characterId: string,
    accessToken: string
  ) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `/character/${characterId}/personality`,
        { personality_traits: traits, ideals, bonds, flaws, history },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await response.data;
      toast.success(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { savePersonality, loading };
};

export default CharacterEdit;
