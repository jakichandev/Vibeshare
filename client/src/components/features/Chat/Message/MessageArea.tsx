import type React from "react";

import type { User } from "../../../../../../shared/types/User";
import { useSocket } from "../../../../global/hooks/useSocket";
import { useEffect, useRef, useState } from "react";

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
      className={`${me ? messageStyles["me"] : messageStyles["they"]} last:mb-20 animate-message-enter motion-reduce:animate-none`}
    >
      <div className="relative">
        <div
          className={me ? messageStyles["profileMe"] : messageStyles["profileThey"]}
        >
          <div className="w-12 h-12 rounded-full bg-theme-v-400"></div>
          <span className="text-theme-v-400 font-black text-ellipsis overflow-hidden whitespace-nowrap text-center w-12 text-sm">
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
  const [hasTopShadow, setHasTopShadow] = useState(false);

  useEffect(() => {
    const el = scrollable.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      setHasTopShadow(el.scrollTop > 0);
    });
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const el = e.currentTarget;
    setHasTopShadow(el.scrollTop > 0);
  };

  return (
    <section
      ref={scrollable}
      onScroll={handleScroll}
      className="relative flex-1 overflow-y-auto pt-16 px-6 no-scrollbar pb-28 md:pb-28"
    >
      {/* sfumatura in alto quando ci sono messaggi precedenti */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-6 md:h-8 bg-gradient-to-b from-theme-v-900/80 to-transparent transition-opacity duration-200 ${hasTopShadow ? "opacity-100" : "opacity-0"}`}
      />
      <ul className="flex flex-col gap-20">{children}</ul>
    </section>
  );
};
