import { lazyLoad } from "../../../utils/loadeable";

export const CreateCharacter = lazyLoad(
  () => import("./index"),
  (module) => module.CreateCharacter
);
