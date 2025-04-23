import React from "react";

const Input = ({
  id,
  name,
  type = "text",
  value,
  className = "",
  disabled = false,
  placeholder = "",
  onChange,
  autoComplete = "off",
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      className={`
        block w-full mt-2 px-3 py-2 
        rounded-md border border-zinc-600 
        bg-zinc-700 text-white placeholder-zinc-400
        focus:outline-none focus:border-blue-500 
        transition 
        ${disabled ? "bg-zinc-800 opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    />
  );
};

export default Input;

export const Textarea = ({
  id,
  name,
  value,
  className = "",
  placeholder = "",
  onChange,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`
        block w-full h-40 mt-2 px-3 py-2 
        rounded-md border border-zinc-600 
        bg-zinc-700 text-white placeholder-zinc-400
        focus:outline-none focus:border-blue-500 
        transition 
        ${className}
      `}
    />
  );
};
