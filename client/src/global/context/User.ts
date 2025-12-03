import { createContext } from "react";
import type { User, UserError } from  "vibeshare_types/types/User";
import type { Message } from "vibeshare_types/types/Message";


export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (prevLoading: boolean) => void;
  error: UserError;
  setError: (prevError: UserError) => void;
  userMessages: Message<string>[];
  setUserMessages: (messages: Message<string>[]) => void;

}


export const UserContext = createContext<UserContextType | null>(null);