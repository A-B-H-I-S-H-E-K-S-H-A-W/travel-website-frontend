import { useParams } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import Layout from "../../Layout";
import { useEffect, useState } from "react";
import Toast from "../../components/common/Toast";

export default function AccountSettings() {
  const token = localStorage.getItem("userToken");
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const { getUser, update } = useUserAuth();
  const { id } = useParams();

  const getUserData = async () => {
    try {
      const res = await getUser(`/api/users/${id}`, token);
      if (res) {
        setUser(res.data);
      } else {
        console.log("Error: No user data returned");
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        country: user.country || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      }

      const res = await update(`/api/users/update/${id}`, form, token);

      console.log(res);

      if (res.success) {
        setResult(res);
      } else {
        setResult(res);
      }
    } catch (error) {
      console.log("error updating user ::::", error);
      setResult({
        success: false,
        message: "Error updating user",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="px-5 md:px-20 pt-20 py-10">
        <div className="py-10">
          <h3 className="text-3xl font-bold">Profile Information</h3>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <div className="space-y-12">
            {/* Profile Section */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-600">
                Update your account details.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="janesmith"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold text-gray-900">
                User Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline outline-gray-300 focus:outline-cyan-600 sm:text-sm"
                    >
                      <option value="">Select Country</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-900"
                  >
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Pincode
                  </label>
                  <div className="mt-2">
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-cyan-600 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="cursor-pointer text-sm font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className={`cursor-pointer rounded-md  px-3 py-2 text-sm font-semibold text-white  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      <Toast result={result} setResult={setResult} />
    </Layout>
  );
}
