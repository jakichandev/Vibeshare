import "./App.css";
import { socket } from "./Socket";
import { Chat } from "./components/features/Chat/Chat";
import { UserSetup } from "./components/features/User/User";
import type { MsgAuth } from "../../shared/types/Message";
import { useEffect, useState } from "react";
import { ChatContext } from "./global/ChatContext";

function App() {
  const userFromStorage = localStorage.getItem("user");
  const user: MsgAuth | undefined = userFromStorage
    ? JSON.parse(userFromStorage)
    : undefined;

  const [userOnline, setUserOnline] = useState(user);
  const [chatActive, activateChat] = useState<boolean>(false);

  useEffect(() => {
    console.log(chatActive);
  }, [chatActive]);

  return (chatActive && userOnline?.id) ? (
    <ChatContext.Provider value={{ chatActive, activateChat }}>
      <Chat socket={socket} user={userOnline} setUserOnline={setUserOnline} />
    </ChatContext.Provider>
  ) : (
    <ChatContext.Provider value={{ chatActive, activateChat }}>
      <UserSetup activateChat={activateChat} />
    </ChatContext.Provider>
  );
}

export default App;
