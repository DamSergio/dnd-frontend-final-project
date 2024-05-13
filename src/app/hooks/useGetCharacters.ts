/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Character } from "../../types/Character";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";
import { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";

const useGetCharacters = () => {
  const { authUser } = useAuthContext();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);

      try {
        const response = await axios("/character/my-characters", {
          headers: { Authorization: `Bearer ${authUser.accessToken}` },
        });
        const data = await response.data;
        setCharacters(data.data);
      } catch (error) {
        const error_message = (
          (error as AxiosError).response?.data as FetchError
        ).message;
        toast.error(error_message);
      }

      setLoading(false);
    };

    getCharacters();
  }, []);

  return { characters, loading };
};

export default useGetCharacters;
