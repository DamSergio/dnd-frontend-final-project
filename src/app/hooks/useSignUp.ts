import React from "react";

import api from "../../utils/axios";
import { AxiosError } from "axios";
import { SignUpUser } from "../../types/User";
import { FetchError } from "../../types/FetchError";

const useSignUp = () => {
  const [loading, setLoading] = React.useState(false);

  const signUp = async (user: SignUpUser) => {
    let fetchError: string | null = null;
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        username: user.username,
        email: user.email,
        password: user.password,
        confirm_password: user.confirmPassword,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      const error_message = ((error as AxiosError).response?.data as FetchError)
        .message;
      fetchError = error_message;
    }

    setLoading(false);
    return fetchError;
  };

  return { loading, signUp };
};

export default useSignUp;
