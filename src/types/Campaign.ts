import { Character } from "./Character";
import { Roll } from "./Roll";

export type CreateCampaign = {
  name: string;
  description: string;
  notes: string;
};

export type Campaign = {
  id: string;
  name: string;
  description: string;
  notes: string;
  dungeon_master: string;
  players: Character[];
  rolls: Roll[];
};

export const DefaultCampaign: Campaign = {
  id: "",
  name: "",
  description: "",
  notes: "",
  dungeon_master: "",
  players: [],
  rolls: [],
};
