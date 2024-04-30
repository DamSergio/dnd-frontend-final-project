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
  characters: [],
  rol: "",
  token: "",
  setAuthUser: (authUser: AuthUser | null) => {},
});

// Hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser") as string) || null
  );

  return (
    <AuthContext.Provider
      value={{
        username: authUser.username,
        email: authUser.email,
        profilePicture: authUser.profilePicture,
        characters: authUser.characters,
        rol: authUser.rol,
        token: authUser.token,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
