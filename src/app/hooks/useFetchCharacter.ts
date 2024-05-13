/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Character } from "../../types/Character";
import axios from "../../utils/axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";

const useFetchCharacter = (id: string) => {
  const [character, setCharacter] = useState<Character>({} as Character);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/character/${id}`);
        const data = response.data.data;
        console.log(data);
        setCharacter(data);
      } catch (error) {
        const error_message = (
          (error as AxiosError).response?.data as FetchError
        ).message;
        toast.error(error_message || (error as Error).message);
        setFetchError(error_message);
      }

      setLoading(false);
    };

    fetchCharacter();
  }, []);

  return { character, loading, fetchError };
};

export default useFetchCharacter;
