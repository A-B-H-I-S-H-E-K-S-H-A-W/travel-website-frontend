import { useState } from "react";
import loginBg from "../../assets/images/login.jpg";
import Layout from "../../Layout";
import { Link } from "react-router-dom";

export default function Auth({ isLoginSection = true }) {
  function userLogin() {
    console.log("Login");
  }
  function userRegistration() {
    console.log("Register");
  }

  return (
    <>
      <Layout showFooter={false}>
        <div
          className="w-screen min-h-screen overflow-hidden"
          style={{
            background: `url(${loginBg})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center justify-center backdrop-blur-sm h-screen bg-black/30">
            <div className="flex flex-col px-6 py-12 lg:px-10 w-xl justify-center rounded-4xl bg-white my-20 mx-5">
              <div className="sm:mx-auto text-center">
                <h1 className="md:text-5xl text-4xl font-semibold style-regular">
                  WanderSphere
                </h1>
                <h2 className="mt-10 text-center text-xl/9 md:text-2xl font-bold tracking-tight text-gray-800">
                  {isLoginSection ? (
                    <p>Login to your account</p>
                  ) : (
                    <p>Register to your account</p>
                  )}
                </h2>
              </div>

              <div className="mt-10">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-700"
                      >
                        Password
                      </label>
                      {isLoginSection ? (
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-cyan-600 hover:text-cyan-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        if (isLoginSection === true) {
                          userLogin();
                        } else {
                          userRegistration();
                        }
                      }}
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      {isLoginSection ? <p>Login</p> : <p>Register</p>}
                    </button>
                  </div>
                </div>

                {isLoginSection ? (
                  <p className="mt-10 text-center text-sm/6 text-gray-800">
                    Not a member?{" "}
                    <Link
                      to="/auth/v1/register"
                      className="font-semibold text-cyan-600 hover:text-cyan-500"
                    >
                      Register
                    </Link>
                  </p>
                ) : (
                  <p className="mt-10 text-center text-sm/6 text-gray-800">
                    Already have an account?{" "}
                    <Link
                      to="/auth/v1/login"
                      className="font-semibold text-cyan-600 hover:text-cyan-500"
                    >
                      Login
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
