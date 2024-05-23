import { lazyLoad } from "../../../utils/loadeable";

export const CampaignPage = lazyLoad(
  () => import("./index"),
  (module) => module.CampaignPage
);
