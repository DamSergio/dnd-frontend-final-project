/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import api from "../../utils/axios";
import { useAuthContext } from "../../contexts/AuthContext";
import { Campaign } from "../../types/Campaign";
import axios, { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";

const useFetchCampaigns = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([] as Campaign[]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchCampaigns = async () => {
      setLoading(true);

      try {
        const response = await api.get("/campaign/my-campaigns", {
          headers: { Authorization: `Bearer ${authUser.accessToken}` },
          cancelToken: source.token,
        });

        if (!isMounted) return;

        const data = await response.data;
        setCampaigns(data.data);
      } catch (error) {
        if (!isMounted) return;

        const error_message = (
          (error as AxiosError).response?.data as FetchError
        ).message;
        toast.error(error_message);
      }

      isMounted && setLoading(false);
    };

    fetchCampaigns();

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, []);

  return { loading, campaigns };
};

export default useFetchCampaigns;
