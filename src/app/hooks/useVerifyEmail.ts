import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { AxiosError } from "axios";

type FetchError = {
  error: string;
  message: string;
};

const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const verifyEmail = async (token: string) => {
    setLoading(true);

    try {
      const response = await axios.get(`/auth/verify/${token}`);
    } catch (error: AxiosError | unknown) {
      const error_message: FetchError | unknown = (error as AxiosError).response
        ?.data;
      setFetchError((error_message as FetchError).message);
    }

    setLoading(false);
  };

  return { loading, fetchError, verifyEmail };
};

export default useVerifyEmail;
