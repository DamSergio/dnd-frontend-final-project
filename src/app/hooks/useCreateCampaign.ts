import { useState } from "react";

import api from "../../utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { FetchError } from "../../types/FetchError";
import { CreateCampaign } from "../../types/Campaign";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useCreateCampaign = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const createCampaign = (campaign: CreateCampaign) => {
    setLoading(true);

    try {
      const response = api.post(
        "/campaign/create",
        {
          ...campaign,
        },
        {
          headers: { Authorization: `Bearer ${authUser.accessToken}` },
        }
      );

      toast.promise(response, {
        loading: "Creating campaign...",
        success: () => {
          navigate("/campaigns");
          return "Campaign created!";
        },
        error: (error) => {
          const error_message = (error as AxiosError).response
            ?.data as FetchError;
          return error_message.message;
        },
      });
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { loading, createCampaign };
};

export default useCreateCampaign;
