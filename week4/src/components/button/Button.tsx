import React from "react";
import { cn } from "@util/cn";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProp) {
  return (
    <button
      type={props.type ?? "button"}
      className={cn(
        "w-full rounded-[2rem] bg-primary-900 px-[1.5rem] py-[1.3rem] text-white body-size-14 hover:bg-primary-900/80",

        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
