/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthUser } from "../types/User";

export const ClearUser: AuthUser = {
  username: "",
  email: "",
  profilePicture: "",
  rol: "",
  accessToken: "",
  id: "",
  invitations: [],
};

const AuthContext = createContext({
  authMessage: "",
  setAuthMessage: (authMessage: string) => {},
  authUser: ClearUser,
  setAuthUser: (
    authUser: AuthUser | ((prevUser: AuthUser) => AuthUser | null)
  ) => {},
});

// Hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser") as string) || ClearUser
  );
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if (authUser) localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authMessage: authMessage,
        setAuthMessage: setAuthMessage,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
