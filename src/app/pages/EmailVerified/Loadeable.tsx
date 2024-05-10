import { lazyLoad } from "../../../utils/loadeable";

export const EmailVerified = lazyLoad(
  () => import("./index"),
  (module) => module.EmailVerified
);
