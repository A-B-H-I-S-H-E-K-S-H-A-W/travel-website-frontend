import { useState } from "react";
import Toast from "../../components/common/Toast";
import loginBg from "../../assets/images/bg_main.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminAuth({ isLoginSection = true }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    domain: "",
  });
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { login, register } = useAdminAuth();

  const handleSubmitRegistration = async () => {
    const res = await register(form);
    setResult(res);
    navigate("/admin/login");
  };

  const handleSubmitLogin = async () => {
    const res = await login(form);
    setResult(res);
    if (res.success === true) {
      console.log(res.admin.domain);
      const domain = res.admin.domain.toLowerCase();
      navigate(`/${domain}/admin/dashboard`);
    } else {
      console.log("error1");
    }
  };

  return (
    <>
      <div
        className="w-screen min-h-screen overflow-hidden"
        style={{
          background: `url(${loginBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center h-screen bg-black/30">
          <div className="flex flex-col h-screen px-6 py-12 lg:px-10 w-3xl justify-center bg-white my-20">
            <div className="sm:mx-auto text-center">
              <h1 className="md:text-5xl text-4xl font-semibold style-regular">
                WanderSphere
              </h1>
              <h2 className="mt-10 text-center text-xl/9 md:text-2xl font-bold tracking-tight text-gray-800">
                {isLoginSection ? (
                  <p>Login to your admin account</p>
                ) : (
                  <p>Register to your admin account</p>
                )}
              </h2>
            </div>

            <div className="mt-6">
              <div className="space-y-2">
                {isLoginSection ? (
                  <div></div>
                ) : (
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm/6 font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                        autoComplete="username"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                )}

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
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
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
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                {isLoginSection ? (
                  <div></div>
                ) : (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-700"
                    >
                      Domain
                    </label>
                    <div className="mt-2">
                      <select
                        onChange={(e) =>
                          setForm({ ...form, domain: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-2 mb-5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      >
                        <option value="Bus">Bus</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Flight">Flight</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    onClick={() => {
                      if (isLoginSection) {
                        handleSubmitLogin();
                      } else {
                        handleSubmitRegistration();
                      }
                    }}
                    type="submit"
                    className="flex w-full cursor-pointer justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    {isLoginSection ? <p>Login</p> : <p>Register</p>}
                  </button>
                </div>
              </div>

              {isLoginSection ? (
                <p className="mt-10 text-center text-sm/6 text-gray-800">
                  Not a member?{" "}
                  <Link
                    to="/admin/register"
                    className="font-semibold text-cyan-600 hover:text-cyan-500"
                  >
                    Register
                  </Link>
                </p>
              ) : (
                <p className="mt-10 text-center text-sm/6 text-gray-800">
                  Already have an account?{" "}
                  <Link
                    to="/admin/login"
                    className="font-semibold text-cyan-600 hover:text-cyan-500"
                  >
                    Login
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
        <Toast result={result} setResult={setResult} />
      </div>
    </>
  );
}
