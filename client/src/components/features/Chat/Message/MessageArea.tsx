import type React from "react";
import type { User } from "../../../../../../shared/types/User";

export interface MessageProps {
  text: string;
  auth: User;
  hour: string;
}

export const Message = ({ text, auth, hour }: MessageProps) => {
  return (
    <li className="bg-theme-gy-500 w-[16rem] text-theme-v-700 rounded-3xl py-2 px-4 relative rounded-bl-sm outline-theme-v-600 outline-3">
      <div className="relative">
        <div className="absolute -bottom-17 -left-17 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-full bg-theme-v-300"></div>
            <span className="text-theme-gy-300 font-bold">{auth?.nickname}</span>
        </div>
        <div className="flex flex-col relative">
          <p className="text-wrap break-words leading-4 text-normal">{text}</p>
        </div>
        <span className="font-h text-xs relative left-[calc(100%-2rem)]">{hour}</span>
      </div>
    </li>
  );
};

export const MessageArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative top-0 left-[calc((100%-45rem)/2)] w-[45rem] h-[45rem] rounded-2xl">
      <ul>{children}</ul>
    </section>
  );
};
