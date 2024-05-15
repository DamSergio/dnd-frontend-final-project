/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Character } from "../../types/Character";
import { useAuthContext } from "../../contexts/AuthContext";
import api from "../../utils/axios";
import axios, { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";

const useGetCharacters = () => {
  const { authUser } = useAuthContext();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const getCharacters = async () => {
      setLoading(true);

      try {
        const response = await api.get("/character/my-characters", {
          headers: { Authorization: `Bearer ${authUser.accessToken}` },
          cancelToken: source.token,
        });

        if (!isMounted) return;

        const data = await response.data;
        setCharacters(data.data);
      } catch (error) {
        if (!isMounted) return;

        const error_message = (
          (error as AxiosError).response?.data as FetchError
        ).message;
        toast.error(error_message);
      }

      isMounted && setLoading(false);
    };

    getCharacters();

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, []);

  return { characters, loading };
};

export default useGetCharacters;
