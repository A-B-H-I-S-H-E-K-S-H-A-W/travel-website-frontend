import React from "react";

const ButtonOutline = ({ title, className }) => {
  return (
    <button
      className={`cursor-pointer text-black font-bold transition duration-200 border-2 border-cyan-500 ${className}`}
    >
      {title}
    </button>
  );
};

const ButtonSolid = ({ title, className }) => {
  return (
    <button
      className={`cursor-pointer bg-cyan-500 text-white font-bold transition duration-200 border-2 border-transparent ${className}`}
    >
      {title}
    </button>
  );
};

export { ButtonOutline, ButtonSolid };
