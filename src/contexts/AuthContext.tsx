/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";

import { AuthUser } from "../types/User";

const AuthContext = createContext({
  username: "",
  email: "",
  profilePicture: "",
  rol: "",
  accessToken: "",
  refreshToken: "",
  authMessage: "",
  setAuthMessage: (authMessage: string) => {},
  setAuthUser: (authUser: AuthUser | null) => {},
});

// Hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const ClearUser = {
  username: "",
  email: "",
  profilePicture: "",
  rol: "",
  accessToken: "",
  refreshToken: "",
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser") as string) || ClearUser
  );
  const [authMessage, setAuthMessage] = useState("");

  return (
    <AuthContext.Provider
      value={{
        username: authUser.username,
        email: authUser.email,
        profilePicture: authUser.profilePicture,
        rol: authUser.rol,
        accessToken: authUser.accessToken,
        refreshToken: authUser.refreshToken,
        authMessage: authMessage,
        setAuthMessage: setAuthMessage,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
