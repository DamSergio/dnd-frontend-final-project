import { lazyLoad } from "../../../utils/loadeable";

export const CreateCampaign = lazyLoad(
  () => import("./index"),
  (module) => module.CreateCampaign
);
