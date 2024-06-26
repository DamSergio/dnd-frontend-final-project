import { lazyLoad } from "../../../utils/loadeable";

export const CharacterPage = lazyLoad(
  () => import("./index"),
  (module) => module.CharacterPage
);
