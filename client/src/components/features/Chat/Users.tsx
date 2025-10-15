import { useEffect, useState } from "react";
import { socket } from "../../../Socket";
import type { User } from "../../../../../shared/types/User/index";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    socket.on("users/list", (usersFromServer: User[]) => {
      setUsers(usersFromServer);
    });
  }, [users]);
  return (
    <div className="users">
      <h3>utenti connessi:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.nickname}</li>
        ))}
      </ul>
    </div>
  );
};
