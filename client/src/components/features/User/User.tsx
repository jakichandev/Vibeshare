import React, { useEffect, useState } from "react";
import type { User } from "../../../../../shared/types/User";
import { useUser } from "../../../global/hooks/useUser";
import { useSocket } from "../../../global/hooks/useSocket";
import { JoinForm } from "./JoinForm";
import smile from "../../../assets/svg/smile_1.svg";

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
      <div className="w-[40rem] fixed mx-[30rem] top-1/2 -translate-y-1/2 box-border rounded-2xl px-14 py-4">
        <h1 className="mb-8 font-bold tracking-tight text-center">
          iniziamo
          <span className="inline-block ml-2.5">
            <img src={smile} alt="smile icon" width={80} />
          </span>
        </h1>

        <JoinForm changeUser={changeUser} createUser={createUser} />
        <div>
          <h4>nickname: {userCreator.nickname}</h4>
          <p>
            {userCreator.name} {userCreator.surname}
          </p>
        </div>
      </div>
    </section>
  );
};
