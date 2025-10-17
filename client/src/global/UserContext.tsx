import { useEffect, useState } from "react";
import type { User, UserError } from "../../../shared/types/User/index";
import type { Message } from "../../../shared/types/Message/index";
import { UserContext } from "./context/User";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [error, setError] = useState<UserError>({
    isError: false,
    label: "No error",
    value: "",
    code: null,
  });

  const [loading, setLoading] = useState(false);

  const [userMessages, setUserMessages] = useState<Array<Message<string>>>([]);

  useEffect(() => {
    setLoading(true);
    let checkUser = localStorage.getItem("user");
    if (!checkUser) {
      setError({
        code: 1,
        label: "Utente non loggato",
        value: "Non puoi entrare in chat se non sei loggato",
        isError: true,
      });
      setUser(null);
    } else {
      setUser(JSON.parse(checkUser));
    }
    setLoading(false);
    return () => {
      checkUser = null;
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        userMessages,
        setUserMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
