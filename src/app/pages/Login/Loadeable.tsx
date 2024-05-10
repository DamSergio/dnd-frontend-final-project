import { lazyLoad } from "../../../utils/loadeable";

export const Login = lazyLoad(
  () => import("./index"),
  (module) => module.Login
);
