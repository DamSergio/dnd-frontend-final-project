/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Character, defaultCharacter } from "../../types/Character";
import api from "../../utils/axios";
import axios, { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";

const useFetchCharacter = (id: string) => {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/character/${id}`, {
          cancelToken: source.token,
        });

        if (!isMounted) return;

        const data = response.data.data;
        setCharacter(data as Character);
        setFetchError(null);
      } catch (error) {
        if (!isMounted) return;

        const error_message = (
          (error as AxiosError).response?.data as FetchError
        ).message;
        toast.error(error_message || (error as Error).message);
        setFetchError(error_message);
      }

      isMounted && setLoading(false);
    };

    fetchCharacter();

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, []);

  return { character, loading, fetchError };
};

export default useFetchCharacter;
