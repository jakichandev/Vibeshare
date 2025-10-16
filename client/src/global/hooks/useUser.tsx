import { useContext } from "react";
import { UserContext } from "../context/User";

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser deve essere usato dentro UserProvider");
  }

  return user;
};
