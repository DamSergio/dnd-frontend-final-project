import { createContext, useContext } from "react";
import { Campaign } from "../../../../types/Campaign";
import { Character } from "../../../../types/Character";

export const CAMPAIGN_STATE = {
  name: "",
  description: "",
  notes: "",
  dungeon_master: "",
  players: [] as Character[],
};

export const CampaignStateContext = createContext({
  campaign: CAMPAIGN_STATE as Campaign,
  setCampaign: (campaign: Campaign) => {},
});

export const useCampaignContext = () => {
  return useContext(CampaignStateContext);
};
