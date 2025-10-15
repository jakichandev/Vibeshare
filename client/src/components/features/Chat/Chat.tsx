import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import type { Message } from "../../../../../shared/types/Message/index";
import { useUser } from "../../../global/hooks/useUser";


import { Users } from "./Users";

export const Chat = ({ socket }: { socket: Socket }) => {
  const [msg, setMsg] = useState("");
  const [connection, setConnection] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleConnect = () => {
      setConnection(true);
      socket.emit("connection/active", {
        msg: `User ${user?.nickname} is now in the chat`,
      });
      return () => {
        socket.emit("user/leave", user);
        socket.disconnect();
      };
    };
    const handleDisconnect = () => {
      setConnection(false);
    };
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket, user]);

  const sendMessage = ({ text, auth, hour, id, idSender }: Message) => {
    if (!text) return;
    if (!auth) return console.log("Errore di autenticazione");
    socket.emit("message/send", { text, auth, hour, id, idSender });
  };

  const disconnect = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <Users />
      <h2>{connection ? `Connesso come ${user?.nickname}` : `Disconnesso`}</h2>
      <button onClick={disconnect}>Disconnetti</button>
      <input type="text" onChange={(event) => setMsg(event.target.value)} />
      <input
        type="submit"
        value="Invia"
        onClick={() => {
          if (user) {
            sendMessage({
              text: msg,
              auth: user,
              hour: Date.now(),
              id: Math.floor(Math.random() * 300000).toString(),
              idSender: user.id,
            });
          }
        }}
      />
    </div>
  );
};
