import { lazyLoad } from "../../../utils/loadeable";

export const SignUp = lazyLoad(
  () => import("./index"),
  (module) => module.SignUp
);
