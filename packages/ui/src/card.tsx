import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-slate-800 p-[1.5px]">
      <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
      <div className="relative z-20 w-full rounded-[0.60rem] bg-gray-200 p-4">
        <h1 className="text-xl border-b pb-2">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  );
}
