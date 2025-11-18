import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  size: "default" | "sm" | "lg";
}

const buttonVariants = cva(
  "inline-flex font-size-base rounded-[1rem] p-[1rem] items-center justify-center  whitespace-nowrap ",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-gray-100 text-blue-gray-500 hover:bg-blue-gray-500 hover:text-white",
        secondary: "bg-white text-blue-gray-500 hover:bg-blue-gray-100",
      },
      size: {
        default: "py-[0.8rem] px-[1.6rem]",
        sm: "py-[0.6rem] px-[1.2rem]",
        lg: "py-[1rem] px-[2rem]",
      },
    },
  }
);

export default function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
