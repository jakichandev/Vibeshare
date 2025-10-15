import "./App.css";
import { socket } from "./Socket";
import { Chat } from "./components/features/Chat/Chat";
import { UserSetup } from "./components/features/User/User";
import type { User } from "../../shared/types/User";
import type { Dispatch, SetStateAction } from "react";
import { useUser } from "./global/hooks/useUser";

export interface UserState {
  userGlobal: User | null;
  setGlobalUser: Dispatch<SetStateAction<User | null>>;
}

function App() {
  const { user } = useUser();

  return <>{user ? <Chat socket={socket} /> : <UserSetup />}</>;
}

export default App;
