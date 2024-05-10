import { lazyLoad } from "../../../utils/loadeable";

export const Characters = lazyLoad(
  () => import("./index"),
  (module) => module.Characters
);
