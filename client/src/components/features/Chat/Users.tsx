import { useSocket } from "../../../global/hooks/useSocket";
import { useUser } from "../../../global/hooks/useUser";
import onlineUsersIcon from "../../../assets/svg/onlineUsersList.svg";

export const Users = () => {
  const { user } = useUser();
  const { usersList } = useSocket();
  return (
    <div className="fixed h-18 hover:h-auto duration-300 transition-[height] ease-in-out overflow-y-hidden md:overflow-y-auto inset-x-4 top-4 md:top-0 md:inset-0 z-1 md:relative md:w-[20rem] bg-theme-v-900 md:h-[65vh] rounded-3xl md:mt-[16.25vh] md:ml-4 box-border px-4 border-theme-v-800 border-1">
     <div className="h-18 flex items-center">
      <img className="w-12" src={onlineUsersIcon} alt="Online users icon" />
     </div>
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
                  ? u.nickname + " •"
                  : u.nickname
              }`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
