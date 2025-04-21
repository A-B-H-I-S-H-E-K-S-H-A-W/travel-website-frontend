import React from "react";
import { ButtonOutline, ButtonSolid } from "../common/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex fixed z-50 top-0 w-full backdrop-blur-xl items-center justify-between md:px-20 px-5 h-20">
        <div className="Logo">
          <Link to={"/"}>
            <h1 className="md:text-3xl text-2xl font-semibold style-regular">
              WanderSphere
            </h1>
          </Link>
        </div>
        <div className="space-x-2">
          <Link to={"/auth/v1/register"}>
            <ButtonOutline
              title={"Register"}
              className={"md:px-3 px-2 py-1 md:py-2 rounded-md"}
            />
          </Link>
          <Link to={"/auth/v1/login"}>
            <ButtonSolid
              title={"Login"}
              className={"md:px-3 px-2 py-1 md:py-2 rounded-md"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
