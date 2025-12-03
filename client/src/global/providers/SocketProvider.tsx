import { io, Socket } from "socket.io-client";
import { SocketContext } from "../context/Socket";
import { useEffect, useState } from "react";
import type { Message } from "../../../../shared/types/Message";
import type { User } from "../../../../shared/types/User";
import { useUser } from "../hooks/useUser";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connection, setConnection] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [messages, setMessages] = useState<Array<Message<string>>>([]);
  const { setUser } = useUser();

  useEffect(() => {
    const socketInstance = io(`http://localhost:${import.meta.env.VITE_SERVER_PORT}`, {
      autoConnect: true,
    });

    socketInstance.on("connect", () => {
      console.log("Connessione tra client e server attiva...");
      setConnection(true);
    });

    socketInstance.on(
      "message/receive",
      (messagesFromServer: Message<string>[]) => {
        setMessages([...messages, ...messagesFromServer]);
      }
    );

    socketInstance.on("messages/receive", (messagesFromServer: Message<string>[]) => {
      setMessages(messagesFromServer);
    });

    socketInstance.on("users/list", (data: User[]) => {
      console.log(data);
      setUsersList(data);
    });

    socketInstance.on("users/update", (data: User[]) => {
      setUsersList(data);
    });

    socketInstance.on("disconnect", () => {
      setUser(null);
      setUsersList([]);
      localStorage.removeItem("user");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
        connection,
        usersList,
        setUsersList,
        messages,
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
