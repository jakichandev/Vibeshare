import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./Socket";
import { Chat } from "./components/features/Chat/Chat";
import type { MsgAuth } from "../../shared/types/Message";
import { UserSetup } from "./components/features/User/User";

function App() {
  
  const [user, setUser] = useState<MsgAuth>({
    nickname: "",
    name: "",
    surname: "",
    id: "",
  });

  useEffect(() => {
    const userSaved = localStorage.getItem("user");
    if (userSaved) setUser(JSON.parse(userSaved));
  }, []);

  return user.id ? (
    <Chat socket={socket} user={user} />
  ) : (
    <UserSetup setUser={setUser} />
  );
}

export default App;
