import { useSocket } from "../../../global/hooks/useSocket";
import { useUser } from "../../../global/hooks/useUser";
import onlineUsersIcon from "../../../assets/svg/onlineUsersList.svg";
import { useState } from "react";
import { Avatar } from "../../features/User/Avatar/SelectAvatar";
import anonAvatar from "../../../assets/svg/avatars/avatar_anon.svg";

export const Users = () => {
  const { user } = useUser();
  const { usersList } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isCurrentUser = (nickname: string) => nickname === user?.nickname;

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center gap-2 cursor-pointer z-20 relative"
        aria-label="Toggle online users list"
      >
        <img
          className="w-13"
          src={onlineUsersIcon}
          alt="Online users icon"
        />
        <span className="text-theme-gy-200 font-bold">online</span>
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Users list overlay */}
      <div
        className={`
          fixed md:relative
          left-1/2 md:left-0
          top-20 md:top-0
          -translate-x-1/2 md:translate-x-0
          w-[calc(100%-2rem)] md:w-full
          max-w-md md:max-w-full
          max-h-[calc(100vh-6rem)] md:max-h-full
          border-1 border-theme-v-800 md:border-0
          bg-theme-v-900 md:bg-transparent
          rounded-3xl
          p-4 md:p-0
          z-20
          overflow-y-auto md:overflow-y-visible
          transition-[opacity,visibility,transform] duration-300
          ${isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-4 md:visible md:opacity-100 md:translate-y-0"}
        `}
      >
        <ul className="flex flex-col gap-1.5">
          {usersList.map((u, index) => (
            <li
              key={u.id ?? index}
              className={`
                box-border
                flex items-center gap-3
                px-3 py-2
                w-full
                rounded-lg
                bg-gradient-to-br from-theme-v-800 via-theme-v-900 to-theme-v-800
                ${isCurrentUser(u.nickname) ? "outline-1 outline-theme-gy-200" : ""}
              `}
            >
              <Avatar
                className="w-14 h-14"
                id={`${u.id} icon`}
                src={u.avatar === "" ? anonAvatar : u.avatar}
                alt={u.nickname}
              />
              <span className="text-normal font-bold font-p w-full text-ellipsis overflow-hidden whitespace-nowrap">
                {u.nickname}
                {isCurrentUser(u.nickname) && " •"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
