import { useEffect, useState } from "react";
import type { Message } from "../../../../../shared/types/Message/index";
import { useUser } from "../../../global/hooks/useUser";
import { Users } from "./Users";
import { useSocket } from "../../../global/hooks/useSocket";

export const Chat = () => {
  const [msg, setMsg] = useState("");
  const { user, setUser } = useUser();
  const { socket } = useSocket();

  useEffect(() => console.log(socket?.id), [socket]);

  useEffect(() => {
    const setOnlineUser = () => {
      if (user && socket) {
        setUser({
          ...user,
          logged: true,
        });
        socket.emit("user/online", user);
      }
    };
    setOnlineUser();
  }, []);

  const sendMessage = ({ text, auth, hour, id, idSender }: Message) => {
    if (!text) return;
    if (!auth) return console.log("Errore di autenticazione");
    socket?.emit("message/send", { text, auth, hour, id, idSender });
  };

  const disconnect = () => {
    socket?.emit("user/left", user);
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      <Users />
      <h2>{user?.id ? user?.id : "Disconnesso"}</h2>
      <button onClick={disconnect}>Disconnetti</button>
      <input type="text" onChange={(event) => setMsg(event.target.value)} />
      <input
        type="submit"
        value="Invia"
        onClick={(event) => {
          event.preventDefault();
          if (user?.logged) {
            sendMessage({
              text: msg,
              auth: user,
              hour: Date.now(),
              id: Math.floor(Math.random() * 300000).toString(),
              idSender: socket?.id,
            });
          }
        }}
      />
    </div>
  );
};
