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
  const [user, setUser] = useState<AuthUser>({} as AuthUser);

  useEffect(() => {
    if (authUser) setUser(authUser);
    else setUser({} as AuthUser);
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        characters: user.characters,
        rol: user.rol,
        token: user.token,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
