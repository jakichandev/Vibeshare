import type React from "react";

interface ButtonType {
  className?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const Button = ({ className, text, onClick }: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`font-p text-xl px-3 py-2 rounded-xl ${className}`}
    >
      {text}
    </button>
  );
};
