/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";
import { Invitation } from "../types/Invitation";
import toast from "react-hot-toast";

export const SocketContext = createContext({
  socket: {} as Socket | null,
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser, setAuthUser } = useAuthContext();

  useEffect((): any => {
    if (authUser) {
      const apiUrl = import.meta.env.VITE_BASE_API_URL;
      const socket = io(apiUrl, {
        withCredentials: true,
        query: { userId: authUser.id },
        transports: ["websocket"],
      });
      setSocket(socket);

      // Escucha por nuevas invitaciones
      socket.on("new_invitation", (invitation: Invitation) => {
        setAuthUser({
          ...authUser,
          invitations: [...authUser.invitations, invitation],
        });

        toast(`Has recivido una invitación de ${invitation.dungeon_master}`);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
