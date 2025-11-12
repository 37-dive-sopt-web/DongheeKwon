import React from "react";

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  placeholder,
  value,
  onChange,
  ...props
}: InputProp) {
  return (
    <input
      className="w-full body-size-14 px-[1.5rem] py-[1rem] rounded-[2rem] border focus:border-primary-900 border-primary-300 text-grayscale-900"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
