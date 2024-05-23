import { useEffect } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { Character } from "../../types/Character";
import { Campaign } from "../../types/Campaign";

const useListenCharacters = (
  campaign: Campaign,
  setCampaign: (campaign: Campaign) => void
) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("character_added", (character: Character) => {
      console.log(character);
      console.log(campaign.dungeon_master);
      setCampaign({
        ...campaign,
        players: [...campaign.players, character],
      });
    });
  }, [socket, campaign, setCampaign]);
};

export default useListenCharacters;
