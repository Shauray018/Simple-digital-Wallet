import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl p-[1.5px] my-2">
            <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
            <div className="relative z-20 w-full rounded-[0.60rem] bg-white p-6 shadow-lg">
                <div className="text-2xl font-bold text-gray-800 border-b pb-2">{title}</div>
                <div className="mt-2 text-gray-600">{children}</div>
            </div>
        </div>
  );
}
