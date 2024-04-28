import { useEffect, useState } from "react";

import { LoginUser, AuthUser } from "../../types/User";
import { FetchError } from "../../types/FetchError";
import axios from "../../utils/axios";
import { AxiosError } from "axios";
import { useAuthContext } from "../../contexts/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const login = async (loginUser: LoginUser) => {
    let fetchError: string | null = null;
    setLoading(true);

    try {
      const response = await axios.post("/auth/login", {
        email: loginUser.email,
        password: loginUser.password,
      });

      const data = await response.data;
      setAuthUser(data.data);
      localStorage.setItem("authUser", JSON.stringify(data.data));
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      fetchError = error_message;
    }

    setLoading(false);
    return fetchError;
  };

  return { loading, login };
};

export default useLogin;
