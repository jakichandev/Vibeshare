import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./global/UserContext.tsx";
import { SocketProvider } from "./global/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <SocketProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </SocketProvider>
  </UserProvider>
);
