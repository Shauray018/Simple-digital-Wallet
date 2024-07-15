"use client";

import { ReactNode } from "react";


interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <a href="#_" 
    onClick={onClick}
    className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-sky-600 active:shadow-none shadow-lg bg-gradient-to-tr from-sky-600 to-sky-500 border-sky-700 text-white">
<span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
<span className="relative">{children}</span>
</a>
  );
};
