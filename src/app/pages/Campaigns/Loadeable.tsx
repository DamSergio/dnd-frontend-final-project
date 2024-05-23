import { lazyLoad } from "../../../utils/loadeable";

export const Campaigns = lazyLoad(
  () => import("./index"),
  (module) => module.Campaigns
);
