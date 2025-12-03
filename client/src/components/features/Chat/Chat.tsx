import { useEffect, useState, useRef } from "react";
import { useUser } from "../../../global/hooks/useUser";
import { useSocket } from "../../../global/hooks/useSocket";
import { ChatRoom } from "./ChatRoom";
import backIcon from "../../../assets/svg/chatBack.svg";
import sendMsgIcon from "../../../assets/svg/sendMessage.svg";
import type { User } from "vibeshare_types/types/User";
import { MessageArea, Message } from "./Message/MessageArea";
import { Nav } from "../../Theme/Navbar/Nav";

export const Chat = () => {
  const [msg, setMsg] = useState("");
  const { user, setUser } = useUser();
  const { socket, setUsersList, usersList, messages } = useSocket();
  const messageInput = useRef<null | HTMLInputElement>(null);

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

  useEffect(() => {
    if (!messages) socket?.emit("messages/get");
  }, [messages]);

  useEffect(() => {
    return () => {
      socket?.emit("page/refresh", user);
    };
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
    setMsg("");
    messageInput.current?.focus();
  };

  const disconnect = () => {
    console.log(usersList);
    socket?.emit("user/left", user, usersList);
    localStorage.removeItem("user");
    setUser(null);
    setUsersList(usersList.filter((u) => u.nickname !== user?.nickname));
  };

  return (
    <section className="fixed inset-0 md:relative md:inset-auto grid grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[16vw_1fr_1fr_1fr] md:grid-rows-1 gap-4 p-2 md:p-8 md:h-screen box-border overflow-hidden">
      <Nav />
        <ChatRoom>
          <img
            className="cursor-pointer absolute top-4 left-4 z-3 w-16"
            onClick={disconnect}
            src={backIcon}
            role="button"
          ></img>
          <MessageArea>
            {messages?.map((m) => (
              <Message
                key={m.id}
                text={m.text}
                auth={m.auth}
                hour={m.hour}
                me={user?.nickname === m.auth?.nickname ? true : false}
              />
            ))}
            <li aria-hidden className="h-28 md:h-28" />
          </MessageArea>
          <div className="absolute inset-x-0 bottom-0 p-4 bg-theme-v-900">
            <div className="w-full bg-theme-v-700 px-3 py-4 rounded-2xl flex items-center gap-2">
              <input
                placeholder="scrivi un messaggio"
                className="w-full focus:outline-0 bg-transparent"
                type="text"
                value={msg}
                onChange={(event) => setMsg(event.target.value)}
                ref={messageInput}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    if (user) sendMessage({ text: msg, auth: user });
                  }
                }}
              />
              <img
                onClick={() => user && sendMessage({ text: msg, auth: user })}
                width={35}
                src={sendMsgIcon}
                alt="send message icon"
                className="cursor-pointer shrink-0"
              />
            </div>
          </div>
        </ChatRoom>
    </section>
  );
};
