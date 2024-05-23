import { AxiosError } from "axios";
import { useRef, useState } from "react";

import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FetchError } from "../../../../types/FetchError";
import api from "../../../../utils/axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import Loader from "../../../components/Loader/Loader";
import { useCampaignContext } from "../components/CampaignContext";

const CampaignNotes = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { invitePlayer, loading } = useInvitePlayer();
  const { campaign } = useCampaignContext();

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Notas</title>
      </Helmet>
      <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
        <h1 className="text-3xl">Notas de DM</h1>
        <div className="divider" />
        <label className="label p-2">
          <span className="text-base label-text">Invitar jugadores</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Email"
            className="w-full input input-bordered"
            ref={emailRef}
          />
          <button
            className="btn btn-info"
            disabled={loading}
            onClick={() =>
              invitePlayer(campaign.id, emailRef.current?.value || "")
            }
          >
            {loading ? <span className="loading loading-spinner" /> : "Invitar"}
          </button>
        </div>
      </div>
    </>
  );
};

const useInvitePlayer = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const invitePlayer = async (campaign_id: string, player_email: string) => {
    setLoading(true);

    try {
      const response = await api.patch(
        "/campaign/invite",
        {
          campaign_id,
          player_email,
        },
        { headers: { Authorization: `Bearer ${authUser.accessToken}` } }
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

  return { invitePlayer, loading };
};

export default CampaignNotes;
