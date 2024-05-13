import { lazyLoad } from "../../../utils/loadeable";

export const Character = lazyLoad(
  () => import("./index"),
  (module) => module.CharacterPage
);
