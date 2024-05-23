import { AxiosError } from "axios";
import { useState } from "react";

import toast from "react-hot-toast";
import { FetchError } from "../../../../types/FetchError";
import api from "../../../../utils/axios";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useCampaignContext } from "./CampaignContext";

const DiceDropDown = () => {
  const { throwDice, loading } = useThrowDice();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-info rounded-btn font-bold min-h-0 h-9"
      >
        Dados
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <button onClick={() => throwDice(4)} disabled={loading}>
            D4
          </button>
        </li>
        <li>
          <button onClick={() => throwDice(6)} disabled={loading}>
            D6
          </button>
        </li>
        <li>
          <button onClick={() => throwDice(8)} disabled={loading}>
            D8
          </button>
        </li>
        <li>
          <button onClick={() => throwDice(10)} disabled={loading}>
            D10
          </button>
        </li>
        <li>
          <button onClick={() => throwDice(12)} disabled={loading}>
            D12
          </button>
        </li>
        <li>
          <button onClick={() => throwDice(20)} disabled={loading}>
            D20
          </button>
        </li>
      </ul>
    </div>
  );
};

const useThrowDice = () => {
  const [loading, setLoading] = useState(false);
  const { campaign } = useCampaignContext();
  const { authUser } = useAuthContext();

  const throwDice = async (dice: number) => {
    setLoading(true);

    try {
      const result = Math.floor(Math.random() * dice) + 1;
      const response = await api.patch(
        "/campaign/roll",
        {
          dice: `D${dice}`,
          result: result,
          campaign_id: campaign.id,
        },
        { headers: { Authorization: `Bearer ${authUser.accessToken}` } }
      );

      await response.data;
      toast(`D${dice} -> ${result}`, { duration: 8000, icon: "🎲" });
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      toast.error(error_message || (error as Error).message);
    }

    setLoading(false);
  };

  return { throwDice, loading };
};

export default DiceDropDown;
