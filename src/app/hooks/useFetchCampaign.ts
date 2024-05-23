/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Campaign, DefaultCampaign } from "../../types/Campaign";
import api from "../../utils/axios";
import axios, { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import toast from "react-hot-toast";
import { useAuthContext } from "../../contexts/AuthContext";

const useFetchCampaign = (id: string) => {
  const [campaign, setCampaign] = useState<Campaign>(DefaultCampaign);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchCampaign = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/campaign/${id}`, {
          headers: { Authorization: `Bearer ${authUser.accessToken}` },
          cancelToken: source.token,
        });

        if (!isMounted) return;

        const data = await response.data;
        setCampaign(data.data);
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

    fetchCampaign();

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [id]);

  return { campaign, loading, fetchError };
};

export default useFetchCampaign;
