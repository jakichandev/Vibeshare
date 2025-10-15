import React, { useState } from "react";
import { socket } from "../../../Socket";
import type { User } from "../../../../../shared/types/User";
import { useUser } from "../../../global/hooks/useUser";

export const UserSetup = () => {
  const { setUser }  = useUser();
  const [userCreator, setUserCreator] = useState<User>({
    nickname: "",
    name: "",
    surname: "",
    id: Math.floor(Math.random() * 30000).toString(),
    logged: false
  });

  const changeUser = (
    event: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => {
    event.preventDefault();
    const value: string = event.target.value;
    if (!value || value.length < 3) {
      return;
    }
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
    localStorage.setItem("user", JSON.stringify(userCreator));
    socket.emit("user/new", userCreator);
    setUser(userCreator);
  };

  return (
    <section>
      <h1>Iniziamo!</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={(event) => changeUser(event, "nickname")}
            type="text"
            aria-label="Input to set nickname"
          ></input>
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            aria-label="Input to set name"
            onChange={(event) => changeUser(event, "name")}
          ></input>
        </div>
        <div>
          <label htmlFor="username">Surname</label>
          <input
            type="text"
            aria-label="Input to set surname"
            onChange={(event) => changeUser(event, "surname")}
          ></input>
        </div>
        <input
          type="submit"
          value="Entra in chat!"
          onClick={(event) => createUser(event)}
        />
      </form>
    </section>
  );
};
