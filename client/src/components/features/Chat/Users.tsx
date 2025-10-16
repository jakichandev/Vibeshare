import { useSocket } from "../../../global/hooks/useSocket";

export const Users = () => {
  const { usersList } = useSocket();
  return (
    <div className="users">
      <h3>utenti connessi:</h3>
      <ul>
        {usersList.map((user, index) => (
          <li key={index}>{user?.nickname}</li>
        ))}
      </ul>
    </div>
  );
};
