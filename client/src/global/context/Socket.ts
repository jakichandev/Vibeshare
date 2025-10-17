import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { User } from "../../../../shared/types/User";
import type { Message } from "../../../../shared/types/Message";

export interface SocketContextType {
  socket: Socket | null;
  connection: boolean;
  usersList: User[];
  setUsersList: (users: User[]) => void;
  messages: Message<string>[];
  setMessages: (messages: Message<string>[]) => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);
