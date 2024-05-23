import { useEffect, useState } from "react";

import MainContainer from "../../components/Containers/MainContainer";
import { Helmet } from "react-helmet";
import { PlusIcon, SearchIcon } from "../../components/Icons/Icons";
import { Link, useSearchParams } from "react-router-dom";
import useFetchCampaigns from "../../hooks/useFetchCampaigns";
import Loader from "../../components/Loader/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";

export const Campaigns = () => {
  const { authUser } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { filteredCampaigns, loading } = useFilterCharacters(searchQuery);

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>Campañas</title>
      </Helmet>
      <MainContainer>
        <div className="flex flex-col w-full justify-center">
          <h1 className="text-1xl lg:text-3xl font-semibold text-center text-gray-300">
            Campañas
          </h1>
          <div className="divider" />
          <div className="flex-1 w-full flex flex-col justify-center items-center">
            {/* Search */}
            <div className="w-full lg:w-2/4 mb-4 flex gap-1">
              <label className="input input-bordered flex flex-1 items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Nombre"
                  value={searchQuery}
                  onChange={(e) => setSearchParams({ search: e.target.value })}
                />
                <SearchIcon />
              </label>
              <Link to={"/createCampaign"}>
                <button
                  className="btn btn-info tooltip"
                  data-tip="Nueva campaña"
                >
                  <PlusIcon />
                </button>
              </Link>
            </div>
            {/* Campaigns */}
            <div className="w-full lg:w-2/4 mb-4 flex flex-col gap-1">
              {filteredCampaigns.map((campaign) => (
                <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
                  <div className="flex flex-col p-2 bg-base-100 rounded-lg hover:bg-base-200 cursor-pointer gap-1">
                    <h2 className="text-xl font-semibold flex justify-between">
                      {campaign.name}
                      {campaign.dungeon_master === authUser.email && (
                        <span className="text-sm">DM</span>
                      )}
                    </h2>
                    <p>{campaign.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

const useFilterCharacters = (searchQuery: string) => {
  const { loading, campaigns } = useFetchCampaigns();
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  useEffect(() => {
    setFilteredCampaigns(
      campaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, campaigns]);

  return { filteredCampaigns, loading };
};
