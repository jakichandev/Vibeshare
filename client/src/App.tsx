import "./App.css";
import { Chat } from "./components/features/Chat/Chat";
import { UserSetup } from "./components/features/User/User";
import { useUser } from "./global/hooks/useUser";

function App() {
  const { user } = useUser();
  return <>{user ? <Chat /> : <UserSetup />}</>;
}

export default App;
