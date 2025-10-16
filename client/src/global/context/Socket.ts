import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { User } from "../../../../shared/types/User";

export interface SocketContextType {
  socket: Socket | null;
  connection: boolean;
  usersList: User[];
  setUsersList: (users: User[]) => void
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);
