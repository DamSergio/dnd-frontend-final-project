import { useEffect } from "react";
import { Campaign } from "../../types/Campaign";
import { useSocketContext } from "../../contexts/SocketContext";

const useListenRolls = (
  campaign: Campaign,
  setCampaign: (campaign: Campaign) => void
) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("roll_added", (roll) => {
      setCampaign({
        ...campaign,
        rolls: [...campaign.rolls, roll],
      });
    });
  }, [socket, campaign, setCampaign]);
};

export default useListenRolls;
