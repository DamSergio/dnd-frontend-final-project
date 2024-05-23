import { Helmet } from "react-helmet";
import Rolls from "../components/Rolls";
import DiceDropDown from "../components/DiceDropDown";
import { useCampaignContext } from "../components/CampaignContext";

const CampaignRolls = () => {
  const { campaign } = useCampaignContext();

  return (
    <>
      <Helmet>
        <title>Tiradas</title>
      </Helmet>
      <div className="flex flex-col h-full w-full lg:w-2/4 overflow-y-auto bg-base-300 p-2 rounded-t-md">
        <h1 className="text-3xl flex justify-between">
          <span>Tiradas</span>
          <DiceDropDown />
        </h1>
        <div className="divider" />
        <Rolls rolls={campaign.rolls} />
      </div>
    </>
  );
};

export default CampaignRolls;
