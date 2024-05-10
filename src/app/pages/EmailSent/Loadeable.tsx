import { lazyLoad } from "../../../utils/loadeable";

export const EmailSent = lazyLoad(
  () => import("./index"),
  (module) => module.EmailSent
);
