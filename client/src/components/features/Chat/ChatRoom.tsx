import type { ReactNode } from "react";

export const ChatRoom = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full bg-theme-v-900 min-h-[100dvh] md:max-h-[85vh] md:mt-[7.5vh] rounded-3xl p-4 shadow-theme-v-900 hover:shadow-2xl border-1 border-theme-v-800 relative flex flex-col  items-center justify-center">
        {children}
    </div>
  );
};
