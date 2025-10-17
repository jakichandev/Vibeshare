import { useEffect } from "react";
import "./App.css"
import { Chat } from "./components/features/Chat/Chat";
import { UserSetup } from "./components/features/User/User";
import { useSocket } from "./global/hooks/useSocket";
import { useUser } from "./global/hooks/useUser";

function App() {
  const { user } = useUser();
  const {usersList} = useSocket();
  useEffect(() => {
    console.log(usersList);
  },[usersList])
  return <>{user ? <Chat /> : <UserSetup />}</>;
}

export default App;
