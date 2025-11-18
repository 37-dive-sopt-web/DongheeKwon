import React from "react";

import { cn } from "@utils/cn";

type InputProp = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  placeholder,
  value,
  onChange,
  className,
  ...props
}: InputProp) {
  return (
    <input
      className={cn(
        "w-full body-size-14 px-[1.5rem] py-[1rem] rounded-[2rem] border focus:border-primary-900 border-primary-300 text-grayscale-900",
        className
      )}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
