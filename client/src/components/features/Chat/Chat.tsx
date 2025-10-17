import { useEffect, useState } from "react";
import type { Message } from "../../../../../shared/types/Message/index";
import { useUser } from "../../../global/hooks/useUser";
import { Users } from "./Users";
import { useSocket } from "../../../global/hooks/useSocket";
import { ChatRoom } from "./ChatRoom";
import backIcon from "../../../assets/svg/chatBack.svg";
import sendMsgIcon from "../../../assets/svg/sendMessage.svg";

export const Chat = () => {
  const [msg, setMsg] = useState("");
  const { user, setUser } = useUser();
  const { socket, setUsersList, usersList } = useSocket();

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
    console.log(usersList);
    socket?.emit("user/left", user, usersList);
    localStorage.removeItem("user");
    setUser(null);
    setUsersList(usersList.filter((u) => u.nickname !== user?.nickname));
  };

  return (
    <section>
      <div className="flex gap-3 w-3/4 justify-center mx-auto">
        <Users />
        <ChatRoom>
          <img
            className="cursor-pointer"
            onClick={disconnect}
            width={60}
            src={backIcon}
          ></img>
          <div className="flex flex-col">
            <div onClick={() => sendMessage({text: msg, auth: user, hour: })} className="w-[calc(100%-2rem)] ml-4 bg-theme-v-700 px-2 py-3 rounded-2xl outline-0 flex items-center absolute bottom-5 left-0 box-border">
              <input
              placeholder="scrivi un messaggio"
                className="w-full focus:outline-0"
                type="text"
                onChange={(event) => setMsg(event.target.value)}
              />
              <img width={35} src={sendMsgIcon} alt="send message icon" />
            </div>
          </div>
        </ChatRoom>
      </div>
    </section>
  );
};
