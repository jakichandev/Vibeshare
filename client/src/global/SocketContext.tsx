import { io, Socket } from "socket.io-client";
import { SocketContext } from "./context/Socket";
import { useEffect, useState } from "react";
import type { Message } from "../../../shared/types/Message";
import type { User } from "../../../shared/types/User";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connection, setConnection] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<Array<User>>([]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("Connessione tra client e server attiva...");
      setConnection(true);
    });

    socketInstance.on("message/receive", (message: Message) => {
      console.log(message);
    })

    socketInstance.on("users/list", (data: User[]) => {
      setUsersList(data);
    })
    
    
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, connection, usersList }}>
      {children}
    </SocketContext.Provider>
  );
};

