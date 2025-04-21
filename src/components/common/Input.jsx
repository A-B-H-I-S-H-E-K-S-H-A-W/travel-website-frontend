import React from "react";

const Input = ({ type, className, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-200 outline-1  -outline-offset-1 outline-blue-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 ${className}`}
    />
  );
};

export default Input;
