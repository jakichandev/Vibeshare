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
  they: `w-[16rem] text-theme-v-700 rounded-3xl py-2 px-4 relative rounded-bl-sm outline-theme-v-900 outline-3 ml-14 bg-gradient-to-br from-theme-gy-300 to-theme-gy-600`,
  me: `w-[16rem] text-theme-v-700 left-[calc(100%-20.75rem)] rounded-3xl py-2 px-4 relative rounded-br-sm outline-theme-v-900 outline-3 bg-gradient-to-br from-theme-gy-300 to-theme-gy-600`,
  profileMe: `absolute -bottom-19 -right-19 flex flex-col justify-center items-center`,
  profileThey: `absolute -bottom-18 -left-18 flex flex-col justify-center items-center`,
};

export const Message = ({ text, auth, hour, me }: MessageProps) => {
  return (
    <li
      aria-label="message bubble"
      key={auth?.id}
      className={me ? messageStyles["me"] : messageStyles["they"]}
    >
      <div className="relative">
        <div
          className={
            me ? messageStyles["profileMe"] : messageStyles["profileThey"]
          }
        >
          <div className="w-12 h-12 rounded-full bg-theme-v-800"></div>
          <span className="text-theme-v-800 font-black font-h italic">{auth?.nickname}</span>
        </div>
        <div className="flex flex-col relative">
          <p className="text-wrap break-words leading-4 text-normal">{text}</p>
        </div>
        <span className="font-h text-xs relative left-[calc(100%-2rem)]">
          {hour}
        </span>
      </div>
    </li>
  );
};

export const MessageArea = ({ children }: { children: React.ReactNode }) => {
  const { messages } = useSocket();
  const scrollable = useRef<null | HTMLElement>(null);
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
      className="w-[60rem] h-[40rem] rounded-2xl overflow-y-scroll py-8 px-6 bg-theme-v-100 no-scrollbar border-theme-v-600 outline-3 outline-theme-v-600"
    >
      <ul className="flex flex-col gap-18">{children}</ul>
    </section>
  );
};
