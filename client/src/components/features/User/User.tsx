import React, { useEffect, useState } from "react";
import type { User } from "../../../../../shared/types/User";
import { useUser } from "../../../global/hooks/useUser";
import { useSocket } from "../../../global/hooks/useSocket";
import { JoinForm } from "./JoinForm";
import smile from "../../../assets/svg/smile_1.svg";
import maleUser from "../../../assets/svg/maleUser.svg";

export const UserSetup = () => {
  const { setUser } = useUser();
  const { socket } = useSocket();

  const [userCreator, setUserCreator] = useState<User>({
    nickname: "",
    name: "",
    surname: "",
    id: Math.floor(Math.random() * 30000).toString(),
    logged: false,
  });

  useEffect(() => {
    setUserCreator(userCreator);
  }, [userCreator]);

  const changeUser = (
    event: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => {
    event.preventDefault();
    const value: string = event.target.value;
    setUserCreator({
      ...userCreator,
      [prop]: value,
    });
  };

  const createUser = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!userCreator || !userCreator.nickname || !userCreator.id) return;
    setUserCreator({ ...userCreator, logged: true });
    setUser({ ...userCreator, logged: true });
    localStorage.setItem("user", JSON.stringify(userCreator));
    socket?.emit("user/new", userCreator);
  };

  return (
    <section>
      <div className="w-full md:w-2/4 md:ml-[calc(100vw-75%)] fixed top-1/2 -translate-y-1/2 box-border rounded-2xl px-14 py-4">
        <h1 className="mb-8 font-normal tracking-tight text-center">
          ciao
          <span className="inline-block ml-2.5">
            <img src={smile} alt="smile icon" width={80} />
          </span>
        </h1>

        <JoinForm changeUser={changeUser} createUser={createUser} />
      </div>
      <div className="fixed top-8 left-8">
        <h4 className="flex items-center gap-2 font-bold text-2xl">
          <span>
            <img src={maleUser} width={30}></img>
          </span>
          {userCreator.nickname}
        </h4>
        <p>
          {userCreator.name} {userCreator.surname}
        </p>
      </div>
    </section>
  );
};
