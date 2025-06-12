import { useEffect, useState } from "react";
import Toast from "../../components/common/Toast";
import { useSuperAdminC } from "../../context/SuperAdminContext";
import { useNavigate } from "react-router-dom";

export default function SuperAdminAuth() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { registerOnce, login } = useSuperAdminC();
  const [form, setForm] = useState({
    email: "",
    password: "",
    loginCode: "",
  });

  const getSuperAdmin = async () => {
    const data = await registerOnce();
    if (data?.message === "Super Admin already registered") return;
    setResult(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("superAdminToken");
    if (token) {
      navigate("/super-admin/dashboard");
    } else {
      getSuperAdmin();
    }
  }, [navigate]);

  const validateForm = () => {
    if (!form.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
      setResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (form.password.length < 6) {
      setResult({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return false;
    }

    if (!form.loginCode || form.loginCode.trim().length !== 5) {
      setResult({
        success: false,
        message: "Login code must be exactly 5 characters",
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await login(form);
      setResult(res);
      if (res?.success) {
        navigate("/super-admin/dashboard");
      }
    } catch (error) {
      setResult({ success: false, message: "Login failed. Please try again." });
    }
  };

  return (
    <div className="w-screen max-h-screen overflow-hidden">
      <div className="flex items-center justify-center bg-gray-900 h-screen w-screen px-2">
        <div className="flex flex-col rounded-2xl shadow-2xl px-6 py-12 lg:px-10 w-2xl justify-center bg-white my-20">
          <div className="sm:mx-auto text-center">
            <h1 className="md:text-5xl text-4xl font-semibold style-regular">
              WanderSphere
            </h1>
            <h2 className="mt-10 text-center text-xl/9 md:text-2xl font-bold tracking-tight text-gray-800">
              Super Admin Login
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-2">
            {/* Email */}
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
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>

            {/* Password */}
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
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>

            {/* Login Code */}
            <div>
              <label
                htmlFor="loginCode"
                className="block text-sm/6 font-medium text-gray-700"
              >
                Login Code
              </label>
              <input
                id="loginCode"
                name="loginCode"
                type="text"
                maxLength={5}
                value={form.loginCode}
                onChange={handleChange}
                autoComplete="one-time-code"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-800 outline outline-gray-300 focus:outline-2 focus:outline-cyan-600 sm:text-sm/6"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-cyan-500 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Toast result={result} setResult={setResult} />
    </div>
  );
}
