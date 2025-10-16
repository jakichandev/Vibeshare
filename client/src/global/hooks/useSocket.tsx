import { useContext } from "react";
import { SocketContext } from "../context/Socket";

export const useSocket = () => {
  const socketContext = useContext(SocketContext);
  if (!socketContext)
    throw new Error("Usare il contesto dentro il suo provider!");
  return socketContext;
};
