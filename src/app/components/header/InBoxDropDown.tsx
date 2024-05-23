import { useState } from "react";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import api from "../../../utils/axios";
import { FetchError } from "../../../types/FetchError";

const InBoxDropDown = () => {
  const { authUser } = useAuthContext();
  const { deleteInvitation, loading } = useDeleteInvitation();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn font-bold min-h-0 h-9"
      >
        <FontAwesomeIcon icon={faEnvelope} />
        <span className="hidden md:flex">Invitaciones</span>
        <span className="badge badge-sm">
          {authUser.invitations.length < 100
            ? authUser.invitations.length
            : "+99"}
        </span>
      </div>
      {authUser.invitations.length > 0 && (
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-auto mt-4 overflow-y-auto max-h-60"
        >
          {authUser.invitations.map((invitation, index) => (
            <li key={index}>
              <div className="flex gap-2 items-center">
                <span className="w-full md:w-56">
                  {invitation.campaign_name}
                </span>
                <Link
                  to={`/campaign/${invitation.campaign_id}`}
                  onClick={() => deleteInvitation(invitation.campaign_id)}
                >
                  <button className="btn btn-sm btn-success" disabled={loading}>
                    Aceptar
                  </button>
                </Link>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteInvitation(invitation.campaign_id)}
                  disabled={loading}
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const useDeleteInvitation = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleDeleteInvitation = (campaign_id: string) => {
    const newInvitations = authUser.invitations.filter(
      (invitation) => invitation.campaign_id !== campaign_id
    );

    setAuthUser({
      ...authUser,
      invitations: newInvitations,
    });
  };

  const deleteInvitation = async (campaign_id: string) => {
    setLoading(true);

    try {
      const response = await api.patch(
        "/user/delete-invitation",
        {
          campaign_id,
        },
        { headers: { Authorization: `Bearer ${authUser.accessToken}` } }
      );

      const data = await response.data;
      handleDeleteInvitation(campaign_id);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message);
    }

    setLoading(false);
  };

  return { deleteInvitation, loading };
};

export default InBoxDropDown;
