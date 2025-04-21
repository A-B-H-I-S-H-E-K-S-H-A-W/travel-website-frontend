import React from "react";

const Loader = () => {
  return (
    <div class="flex gap-2 w-full justify-center py-10 items-center">
      <div class="w-5 h-5 rounded-full animate-pulse bg-cyan-600 duration-700"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-cyan-600 duration-[750ms]"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-cyan-600 duration-[800ms]"></div>
    </div>
  );
};

export default Loader;
