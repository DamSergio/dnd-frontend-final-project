/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { ClearUser, useAuthContext } from "../../contexts/AuthContext";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import ToastSessionExpired from "../components/CustomToasts/ToastSessionExpired";

const refreshTokenTime = 1000 * 60 * 3;

const useRefreshToken = () => {
  const { authUser, setAuthUser, setAuthMessage } = useAuthContext();
  let accessToken = authUser.accessToken;

  useEffect(() => {
    const refreshToken = async () => {
      if (!accessToken) return;

      try {
        const response = await api.get("/auth/refresh", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await response.data.data;
        accessToken = data.accessToken;

        setAuthUser((prev) => ({ ...prev, accessToken }));
      } catch (error) {
        setAuthUser(ClearUser);
        localStorage.removeItem("authUser");

        clearInterval(refresh);
        accessToken = "";

        toast.custom((t) => <ToastSessionExpired t={t} />);
        setAuthMessage(
          "Tu sesión ha caducado, por favor inicia sesión de nuevo."
        );
      }
    };

    refreshToken();
    const refresh = setInterval(refreshToken, refreshTokenTime);

    return () => clearInterval(refresh);
  }, [authUser.email]);
};

export default useRefreshToken;
