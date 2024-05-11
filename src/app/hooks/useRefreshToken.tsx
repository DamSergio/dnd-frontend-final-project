/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { ClearUser, useAuthContext } from "../../contexts/AuthContext";
import axios from "../../utils/axios";
import { AuthUser } from "../../types/User";
import toast from "react-hot-toast";
import ToastSessionExpired from "../components/CustomToasts/ToastSessionExpired";

const refreshTokenTime = 1000 * 60 * 3;

const useRefreshToken = () => {
  const {
    refreshToken: token,
    username,
    email,
    profilePicture,
    rol,
    setAuthUser,
    setAuthMessage,
  } = useAuthContext();

  useEffect(() => {
    const refreshToken = async () => {
      if (!token) return;

      try {
        const response = await axios.get("/auth/refresh", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.data.data;
        const user: AuthUser = {
          username,
          email,
          profilePicture,
          rol,
          accessToken: data.accessToken,
          refreshToken: token,
        };
        setAuthUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (error) {
        setAuthUser(ClearUser);
        localStorage.removeItem("authUser");

        clearInterval(refresh);

        toast.custom((t) => <ToastSessionExpired t={t} />);
        setAuthMessage(
          "Tu sesión ha caducado, por favor inicia sesión de nuevo."
        );
      }
    };

    refreshToken();
    const refresh = setInterval(refreshToken, refreshTokenTime);

    return () => clearInterval(refresh);
  }, [email]);
};

export default useRefreshToken;
