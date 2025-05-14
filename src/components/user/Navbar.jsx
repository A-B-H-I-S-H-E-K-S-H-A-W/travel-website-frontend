import React, { useState } from "react";
import { ButtonOutline, ButtonSolid } from "../common/Button";
import { Link } from "react-router-dom";
import avatar from "../../assets/static/avatar.jpg";

const Navbar = ({ user }) => {
  const [toggle, setToggle] = useState(false);
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
          {user ? (
            <div>
              <div className="">
                <button
                  className="cursor-pointer flex items-center gap-5"
                  onClick={() => setToggle((prev) => !prev)}
                >
                  <p className="text-black font-semibold text-md">
                    {user.email}
                  </p>

                  <img
                    className="w-10 rounded-full"
                    src={user.avatar ? user.avatar : avatar}
                    alt="img"
                  />
                </button>
              </div>
              {toggle ? (
                <div
                  className="absolute right-5 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-hidden"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-0"
                    >
                      Account Settings
                    </a>
                  </div>
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-4"
                    >
                      Saved
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-5"
                    >
                      Trips
                    </a>
                  </div>
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-6"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
