import { AxiosError } from "axios";
import { useRef, useState } from "react";

import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { FetchError } from "../../../../types/FetchError";
import api from "../../../../utils/axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import Loader from "../../../components/Loader/Loader";
import { useCampaignContext } from "../components/CampaignContext";
import { useNavigate } from "react-router-dom";

const CampaignNotes = () => {
  const { invitePlayer, loading: inviteLoading } = useInvitePlayer();
  const { saveNotes, loading: notesLoading } = useSaveNotes();
  const { deleteCampaign, loading: deleteLoading } = useDeleteCampaign();
  const { campaign } = useCampaignContext();

  const emailRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {(inviteLoading || notesLoading) && <Loader />}
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
            disabled={inviteLoading}
            onClick={() =>
              invitePlayer(campaign.id, emailRef.current?.value || "")
            }
          >
            {inviteLoading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Invitar"
            )}
          </button>
        </div>

        <label className="label p-2">
          <span className="text-base label-text">Notas</span>
        </label>
        <textarea
          className="w-full h-32 textarea textarea-bordered"
          placeholder="Escribe tus notas aquí"
          ref={notesRef}
          defaultValue={campaign.notes}
        />
        <button
          className="btn btn-success w-full mt-4"
          onClick={() => {
            saveNotes(campaign.id, notesRef.current?.value || "");
            campaign.notes = notesRef.current?.value || "";
          }}
        >
          {notesLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Guardar notas"
          )}
        </button>

        <div className="divider" />

        <button
          className="btn btn-error"
          onClick={() =>
            (
              document.getElementById("modalCampaign") as HTMLDialogElement
            ).showModal()
          }
        >
          {deleteLoading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Borrar campaña"
          )}
        </button>
      </div>

      <dialog id="modalCampaign" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Borrar</h3>
          <p className="py-4">¿Seguro que quieres borrar la campaña?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-1">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-info w-20"
                onClick={() => deleteCampaign(campaign.id)}
              >
                Si
              </button>
              <button className="btn btn-error w-20">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

const useDeleteCampaign = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  const deleteCampaign = async (campaign_id: string) => {
    setLoading(true);

    try {
      const response = await api.delete(`/campaign/${campaign_id}/delete`, {
        headers: { Authorization: `Bearer ${authUser.accessToken}` },
      });

      const data = await response.data;
      toast.success(data.message);
      navigate("/campaigns");
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { deleteCampaign, loading };
};

const useSaveNotes = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const saveNotes = async (campaign_id: string, notes: string) => {
    setLoading(true);

    try {
      const response = await api.patch(
        `campaign/${campaign_id}/notes`,
        { notes },
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

  return { saveNotes, loading };
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
