import loginBg from "../../assets/images/login.jpg";
import Layout from "../../Layout";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useState } from "react";
import Toast from "../../components/common/Toast";

export default function Auth({ isLoginSection = true }) {
  const { register, login } = useUserAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [result, setResult] = useState(null);

  const handleSubmitRegistration = async () => {
    const res = await register(form);
    setResult(res);
    navigate("/auth/v1/login");
  };

  const handleSubmitLogin = async () => {
    const res = await login(form);
    setResult(res);
    if (res.success) {
      navigate("/");
    } else {
      console.log("Error");
    }
  };

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
          <div className="flex items-center justify-center backdrop-blur-sm h-[95vh] bg-black/30 mt-8">
            <div className="flex flex-col px-4 py-8 lg:px-8 w-xl justify-center rounded-4xl bg-white my-20 mx-5">
              <div className="sm:mx-auto text-center">
                <h1 className="md:text-5xl text-4xl font-semibold style-regular">
                  WanderSphere
                </h1>
                <h2 className="mt-2 text-center text-xl/9 md:text-2xl font-bold tracking-tight text-gray-800">
                  {isLoginSection ? (
                    <p>Login to your account</p>
                  ) : (
                    <p>Register to your account</p>
                  )}
                </h2>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
                    setResult({
                      success: false,
                      message: "Invalid email format.",
                    });
                    return;
                  }
                  if (!form.password || form.password.length < 6) {
                    setResult({
                      success: false,
                      message: "Password must be at least 6 characters long.",
                    });
                    return;
                  }
                  if (!isLoginSection && !form.username.trim()) {
                    setResult({
                      success: false,
                      message: "Username is required.",
                    });
                    return;
                  }

                  if (form.password.length < 6) {
                    setResult({
                      success: false,
                      message: "Password must be at least 6 characters long",
                    });
                    return false;
                  }

                  isLoginSection
                    ? handleSubmitLogin()
                    : handleSubmitRegistration();
                }}
                noValidate
              >
                <div className="mt-6 space-y-2">
                  {!isLoginSection && (
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
                          value={form.username}
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
                        value={form.email}
                        required
                        title="Please enter a valid email address"
                        autoComplete="email"
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        required
                        minLength={6}
                        title="Password must be at least 6 characters"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      {isLoginSection ? <p>Login</p> : <p>Register</p>}
                    </button>
                  </div>
                  {isLoginSection ? (
                    <p className="mt-5 text-center text-sm/6 text-gray-800">
                      Not a member?{" "}
                      <Link
                        to="/auth/v1/register"
                        className="font-semibold text-cyan-600 hover:text-cyan-500"
                      >
                        Register
                      </Link>
                    </p>
                  ) : (
                    <p className="mt-5 text-center text-sm/6 text-gray-800">
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
              </form>

              <div className="text-center mt-5">
                <Link
                  to="/admin/register"
                  className="px-8 py-2 w-full rounded-md 
             bg-gradient-to-r from-blue-500 to-purple-600 
             hover:from-blue-600 hover:to-purple-500 
             text-white transition-all duration-500 ease-in-out 
             text-center block"
                >
                  Want to List Events? Click here to register
                </Link>
              </div>
            </div>
          </div>
          <Toast result={result} setResult={setResult} />
        </div>
      </Layout>
    </>
  );
}
