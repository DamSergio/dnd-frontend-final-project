import { lazyLoad } from "../../../utils/loadeable";

export const Home = lazyLoad(
  () => import("./index"),
  (module) => module.Home
);
