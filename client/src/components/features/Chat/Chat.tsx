import { useEffect, useState, useRef } from "react";
import { useUser } from "../../../global/hooks/useUser";
import { Users } from "./Users";
import { useSocket } from "../../../global/hooks/useSocket";
import { ChatRoom } from "./ChatRoom";
import backIcon from "../../../assets/svg/chatBack.svg";
import sendMsgIcon from "../../../assets/svg/sendMessage.svg";
import type { User } from "../../../../../shared/types/User";
import { MessageArea, Message } from "./Message/MessageArea";

export const Chat = () => {
  const [msg, setMsg] = useState("");
  const { user, setUser } = useUser();
  const { socket, setUsersList, usersList, messages, setMessages } = useSocket();
  const messageInput = useRef<null | HTMLInputElement>(null);

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


  const sendMessage = ({ text, auth }: { text: string; auth: User }) => {
    if (!text) return;
    if (!auth) return console.log("Errore di autenticazione");

    const now = new Date();
    const hour = now
      .toLocaleTimeString("it-IT", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .toString();

    const id = Math.floor(Math.random() * 600000);
    const idSender = auth?.id;

    socket?.emit("message/send", { text, auth, hour, id, idSender });
    messageInput.current!.value = "";
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
            className="cursor-pointer absolute top-4 left-4"
            onClick={disconnect}
            width={60}
            src={backIcon}
            role="button"
          ></img>
          <MessageArea>
            {messages?.map((m) => (
              <Message key={m.id} text={m.text} auth={m.auth} hour={m.hour} me={user?.nickname === m.auth.nickname ? true : false} />
            ))}
          </MessageArea>
          <div className="flex flex-col">
            <div className="w-[calc(100%-2rem)] ml-4 bg-theme-v-700 px-2 py-3 rounded-2xl outline-0 flex items-center absolute bottom-5 left-0 box-border">
              <input
                placeholder="scrivi un messaggio"
                className="w-full focus:outline-0"
                type="text"
                onChange={(event) => setMsg(event.target.value)}
                ref={messageInput}
              />
              <img
                onClick={() => user && sendMessage({ text: msg, auth: user })}
                width={35}
                src={sendMsgIcon}
                alt="send message icon"
              />
            </div>
          </div>
        </ChatRoom>
      </div>
    </section>
  );
};
