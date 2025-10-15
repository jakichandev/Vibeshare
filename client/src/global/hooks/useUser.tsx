import { useContext, useEffect } from "react";
import { UserContext } from "../context/User";

export const useUser = () => {
  const user = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      throw new Error("useUser deve essere usato dentro UserProvider");
    }
    if (!user?.user) {
      user?.setError({
        code: 1,
        label: "Utente non loggato",
        value: "Non puoi entrare in chat se non sei loggato",
        isError: true,
      });
    }
  }, [user]);

  return user;
};
