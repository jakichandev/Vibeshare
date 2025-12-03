import { useState } from "react";
import type { User } from "../../../../../shared/types/User";
import { useUser } from "../../../global/hooks/useUser";
import { useSocket } from "../../../global/hooks/useSocket";
import { JoinForm } from "./JoinForm";
import { Logo } from "../../Theme/Navbar/Logo"; // se non hai il componente, sostituisci con l'immagine 'smile'

export const UserSetup = () => {
  const { setUser } = useUser();
  const { socket } = useSocket();

  const [userCreator, setUserCreator] = useState<User>({
    nickname: "",
    name: "",
    surname: "",
    id: Math.floor(Math.random() * 30000).toString(),
    logged: false,
    avatar: ""
  });

  const onChange = (prop: "nickname" | "name" | "surname" | "avatar", value: string) => {
    setUserCreator((prev) => ({ ...prev, [prop]: value }));
  };

  const onSubmit = () => {
    if (!userCreator?.nickname?.trim()) return;
    const newUser: User = { ...userCreator, logged: true };
    setUserCreator(newUser);
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    socket?.emit("user/new", newUser);
  };

  return (
    <section className="min-h-[100dvh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl md:max-w-2xl bg-theme-v-900 rounded-2xl border border-theme-v-800 shadow-[0_8px_30px_rgba(0,0,0,0.20)] p-6 md:p-10">
        {/* Logo centrato */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <Logo />
          <h1 className="text-center font-normal tracking-tight">
            <span className="align-middle">ciao</span>
          </h1>
        </div>

        <JoinForm
          nickname={userCreator?.nickname ?? ""}
          name={userCreator?.name ?? ""}
          surname={userCreator?.surname ?? ""}
          avatar={userCreator?.avatar ?? ""}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    </section>
  );
};
