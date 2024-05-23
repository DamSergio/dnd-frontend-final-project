import { lazyLoad } from "../../../utils/loadeable";

export const Profile = lazyLoad(
  () => import("./index"),
  (module) => module.Profile
);
