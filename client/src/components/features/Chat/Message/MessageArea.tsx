import type React from "react";

import type { User } from "../../../../../../shared/types/User";
import { useSocket } from "../../../../global/hooks/useSocket";
import { useEffect, useRef } from "react";

export interface MessageProps {
  text: string;
  auth: User;
  hour: string;
  me: boolean;
}

const messageStyles = {
  they: `w-[16rem] text-theme-v-700 rounded-3xl py-2 px-4 relative rounded-bl-sm outline-theme-v-900 outline-3 ml-14 bg-gradient-to-br from-theme-gy-300 to-theme-gy-600 origin-bottom-left`,
  me: `w-[16rem] text-theme-v-700 left-[calc(100%-20.75rem)] rounded-3xl py-2 px-4 relative rounded-br-sm outline-theme-v-900 outline-3 bg-gradient-to-br from-theme-gy-300 to-theme-gy-600 origin-bottom-right`,
  profileMe: `w-14 absolute -bottom-18 -right-18 flex flex-col justify-center items-center`,
  profileThey: `w-14 absolute -bottom-18 -left-18 flex flex-col justify-center items-center`,
};

export const Message = ({ text, auth, hour, me }: MessageProps) => {
  return (
    <li
      aria-label="message bubble"
      className={`${me ? messageStyles["me"] : messageStyles["they"]} last:mb-20 animate-message-enter`}
    >
      <div className="relative">
        <div
          className={me ? messageStyles["profileMe"] : messageStyles["profileThey"]}
        >
          <div className="w-12 h-12 rounded-full bg-theme-v-800"></div>
          <span className="text-theme-v-800 font-black text-ellipsis overflow-hidden whitespace-nowrap text-center w-12 text-sm">
            {auth?.nickname}
          </span>
        </div>
        <div className="flex flex-col relative">
          <p className="text-wrap break-words leading-4 text-normal">{text}</p>
        </div>
        <span className="text-xs relative left-[calc(100%-2rem)]">{hour}</span>
      </div>
    </li>
  );
};

export const MessageArea = ({ children }: { children: React.ReactNode }) => {
  const { messages } = useSocket();
  const scrollable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = scrollable.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages]);

  return (
    <section
      ref={scrollable}
      className="relative w-full h-[80%] rounded-2xl overflow-y-scroll py-8 px-2 my-18 bg-theme-v-100 no-scrollbar"
    >
      <ul className="flex flex-col gap-20">{children}</ul>
    </section>
  );
};
