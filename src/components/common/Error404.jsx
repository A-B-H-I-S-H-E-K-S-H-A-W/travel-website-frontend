import React from "react";
import { Link } from "react-router-dom";
import { ButtonSolid } from "./Button";

const Error404 = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-cyan-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <ButtonSolid
            title={"Go back home"}
            className={"md:px-3 px-2 py-1 md:py-2 rounded-md"}
          />
        </div>
      </div>
    </main>
  );
};

export default Error404;
