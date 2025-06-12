import { useEffect, useState } from "react";
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
  const [result, setResult] = useState(null);
  const { login, register } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        navigate("/super-admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const validateForm = () => {
    if (!form.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
      setResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (!isLoginSection) {
      if (!form.domain) {
        setResult({ success: false, message: "Please select a valid domain" });
        return false;
      }
    }

    if (form.password.length < 6) {
      setResult({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLoginSection) {
      const res = await login(form);
      setResult(res);
      if (res.success === true) {
        const domain = res.admin.domain.toLowerCase();
        navigate(`/${domain}/admin/dashboard`);
      }
    } else {
      const res = await register(form);
      setResult(res);
      navigate("/admin/login");
    }
  };

  return (
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
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col h-screen px-6 py-12 lg:px-10 w-3xl justify-center bg-white my-20"
        >
          <div className="sm:mx-auto text-center">
            <h1 className="md:text-5xl text-4xl font-semibold style-regular">
              WanderSphere
            </h1>
            <h2 className="mt-10 text-center text-xl/9 md:text-2xl font-bold tracking-tight text-gray-800">
              {isLoginSection
                ? "Login to your admin account"
                : "Register to your admin account"}
            </h2>
          </div>

          <div className="mt-6 space-y-2">
            {!isLoginSection && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600"
              />
            </div>

            {!isLoginSection && (
              <div>
                <label
                  htmlFor="domain"
                  className="block text-sm/6 font-medium text-gray-700"
                >
                  Domain
                </label>
                <select
                  id="domain"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  className="block w-full rounded-md px-3 py-2 mb-5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600"
                >
                  <option value="">Select Domain</option>
                  <option value="Bus">Bus</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Flight">Flight</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-cyan-500 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 cursor-pointer"
            >
              {isLoginSection ? "Login" : "Register"}
            </button>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-800">
            {isLoginSection ? (
              <>
                Not a member?{" "}
                <Link
                  to="/admin/register"
                  className="font-semibold text-cyan-600 hover:text-cyan-500 cursor-pointer"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/admin/login"
                  className="font-semibold text-cyan-600 hover:text-cyan-500 cursor-pointer"
                >
                  Login
                </Link>
              </>
            )}
          </p>

          <div className="mt-5">
            <Link
              to="/"
              className="px-8 py-2 w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-500 text-white text-center block"
            >
              Go to Website
            </Link>
          </div>
        </form>
        <Toast result={result} setResult={setResult} />
      </div>
    </div>
  );
}
