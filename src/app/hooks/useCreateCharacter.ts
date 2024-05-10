import { useState } from "react";

import { Character } from "../../types/Character";
import { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import axios from "../../utils/axios";
import { useAuthContext } from "../../contexts/AuthContext";

const useCreateCharacter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { token } = useAuthContext();

  const createCharacter = async (character: Character) => {
    setLoading(true);

    try {
      console.log(character);
      const response = await axios.post(
        "/character/create",
        {
          name: character.name,
          age: character.age,
          gender: character.gender,

          background: character.background,
          alignment: character.alignment,

          personality_traits: character.personalityTraits,
          ideals: character.ideals,
          bonds: character.bonds,
          flaws: character.flaws,
          history: character.history,

          character_race: character.race,
          character_class: character.cls,

          hit_points: character.hitPoints,
          armor_class: character.armorClass,
          speed: character.speed,
          saving_throws: character.savingThrows,
          armor_proficiencies: character.armorProficiencies,
          weapon_proficiencies: character.weaponProficiencies,
          tool_proficiencies: character.toolProficiencies,

          stats: character.stats,
          coins: character.coins,

          skills: character.skills,
          traits: character.traits,
          items: character.items,
          languages: character.languages,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.data;
      setSuccess(data.message);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      setFetchError(error_message);
    }
  };

  return { loading, success, fetchError, createCharacter };
};

export default useCreateCharacter;
