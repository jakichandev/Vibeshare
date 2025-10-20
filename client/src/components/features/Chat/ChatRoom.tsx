import type { ReactNode } from "react";

export const ChatRoom = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full bg-theme-v-900 col-span-3 rounded-3xl border-1 border-theme-v-800 relative flex flex-col overflow-hidden">
        {children}
    </div>
  );
};
