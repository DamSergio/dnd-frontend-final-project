import React from "react";

import axios from "../../utils/axios";
import { AxiosError } from "axios";

type SignUpInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpError = {
  error: string;
  message: string;
};

const useSignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  const signUp = async (user: SignUpInputs) => {
    setLoading(true);

    try {
      const response = await axios.post("/auth/register", {
        username: user.username,
        email: user.email,
        password: user.password,
        confirm_password: user.confirmPassword,
      });
      const response_data = response.data;
      console.log(response_data);
    } catch (error: AxiosError | unknown) {
      const error_message: SignUpError | unknown = (error as AxiosError)
        .response?.data;
      setFetchError((error_message as SignUpError).message);
    }

    setLoading(false);
  };

  return { loading, fetchError, signUp };
};

export default useSignUp;

// await fetch("http://127.0.0.1:5000/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username: user.username,
//           email: user.email,
//           password: user.password,
//           confirm_password: user.confirmPassword,
//         }),
//       });
