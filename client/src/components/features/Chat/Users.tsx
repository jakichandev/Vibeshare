import { useSocket } from "../../../global/hooks/useSocket";
import { useUser } from "../../../global/hooks/useUser";

export const Users = () => {
  const { user } = useUser();
  const { usersList } = useSocket();
  return (
    <div className="w-[18rem] bg-theme-v-900 h-[65vh] rounded-3xl mt-[16.25vh] ml-4 box-border px-4 p-2 border-theme-v-800 border-1">
      <h3 className="font-bold text-3xl">online</h3>
      <ul className="flex flex-col gap-2 mt-3">
        {usersList.map((u, index) => (
          <li
            className={`px-2 py-3 rounded-lg ${
              u?.nickname === user?.nickname
                ? "bg-gradient-to-br from-theme-v-800 via-theme-v-900 to-theme-v-800 outline-1 outline-theme-gy-200"
                : "bg-gradient-to-br from-theme-v-800 via-theme-v-900 to-theme-v-800"
            }`}
            key={index}
          >
            <span className="font-2xl font-bold font-p">
              {`${
                u.nickname === user?.nickname
                  ? u.nickname + " (you)"
                  : u.nickname
              }`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
