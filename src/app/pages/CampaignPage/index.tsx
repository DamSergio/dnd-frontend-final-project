/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Campaign, DefaultCampaign } from "../../../types/Campaign";
import { Helmet } from "react-helmet";
import MainContainer from "../../components/Containers/MainContainer";
import { useAuthContext } from "../../../contexts/AuthContext";
import useFetchCampaign from "../../hooks/useFetchCampaign";
import Loader from "../../components/Loader/Loader";
import { GroupIcon } from "../../components/Icons/Icons";
import { faDice, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CampaignCharacters from "./tabs/CampaignCharacters";
import {
  CAMPAIGN_STATE,
  CampaignStateContext,
  useCampaignContext,
} from "./components/CampaignContext";
import CampaignNotes from "./tabs/CampaignNotes";
import useListenCharacters from "../../hooks/useListenCharacters";
import CampaignRolls from "./tabs/CampaignRolls";
import useListenRolls from "../../hooks/useListenRolls";

export const CampaignPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authUser } = useAuthContext();
  const tab = searchParams.get("tab");
  const { id } = useParams() as { id: string };
  const { campaign, loading, fetchError } = useFetchCampaign(id);
  const isDM = campaign?.dungeon_master === authUser.email;

  const [campaignState, setCampaign] = useState<Campaign>(campaign);
  useListenCharacters(campaignState, setCampaign);
  useListenRolls(campaignState, setCampaign);

  useEffect(() => {
    if (tab !== "characters" && tab !== "rolls" && tab !== "notes")
      setSearchParams({ tab: "characters" });

    if (tab === "notes" && isDM && authUser.rol !== "admin")
      setSearchParams({ tab: "characters" });
  }, [tab, setSearchParams, authUser, isDM]);

  useEffect(() => {
    return () => setCampaign(DefaultCampaign);
  }, []);

  useEffect(() => {
    setCampaign(campaign);
  }, [campaign]);

  return (
    <CampaignStateContext.Provider
      value={{ campaign: campaignState, setCampaign }}
    >
      {loading && <Loader />}
      <Helmet>
        <title>{campaign.name}</title>
      </Helmet>
      <MainContainer>
        {!fetchError && !loading && tab === "characters" && (
          <CampaignCharacters />
        )}
        {!fetchError && !loading && tab === "rolls" && <CampaignRolls />}
        {!fetchError && !loading && tab === "notes" && <CampaignNotes />}

        <div className="btm-nav lg:w-2/4 static rounded-b-md">
          <button
            onClick={() => setSearchParams({ tab: "characters" })}
            className={`rounded-b-md ${tab === "characters" ? "active" : ""}`}
          >
            <GroupIcon />
          </button>
          <button
            onClick={() => setSearchParams({ tab: "rolls" })}
            className={`rounded-b-md ${tab === "rolls" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faDice} />
          </button>
          {(isDM || authUser.rol === "admin") && (
            <button
              onClick={() => setSearchParams({ tab: "notes" })}
              className={`rounded-b-md ${tab === "notes" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          )}
        </div>
      </MainContainer>
    </CampaignStateContext.Provider>
  );
};
