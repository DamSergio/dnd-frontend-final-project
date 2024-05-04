/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthUser } from "../types/User";

const AuthContext = createContext({
  username: "",
  email: "",
  profilePicture: "",
  rol: "",
  token: "",
  setAuthUser: (authUser: AuthUser | null) => {},
});

// Hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const ClearUser = {
  username: "",
  email: "",
  profilePicture: "",
  rol: "",
  token: "",
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser") as string) || ClearUser
  );

  return (
    <AuthContext.Provider
      value={{
        username: authUser.username,
        email: authUser.email,
        profilePicture: authUser.profilePicture,
        rol: authUser.rol,
        token: authUser.token,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
