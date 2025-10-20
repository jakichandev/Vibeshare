import { Logo } from "./Logo";
import { Users } from "../../features/Chat/Users";

export const Nav = () => {
  return (
    <nav className="
      w-full
      md:col-1 
      flex md:flex-col 
      items-center md:items-start
      justify-between md:justify-start 
      gap-4 md:gap-6 
      py-3
      px-2 md:px-0
    ">
      <Logo />
      <Users />
    </nav>
  );
};
