import React, { useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import { updateAdmin } from "../../services/ApiServices";
import Toast from "../../components/common/Toast";
import { useAdminAuth } from "../../context/AdminAuthContext";

const ProfileSettings = () => {
  const { fetchAdmin } = useAdminAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState(null);

  const getAdminData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const data = await fetchAdmin(token);

      setAdminData(data);
    } catch (error) {
      console.log("ERROR :::", error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, [result]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    pancardNumber: "",
    gstNumber: "",
    license: null, // file
  });

  // 🔄 Fetch admin data on mount
  useEffect(() => {
    if (adminData) {
      setFormData((prev) => ({
        ...prev,
        username: adminData.username || "",
        email: adminData.email || "",
        phoneNumber: adminData.phoneNumber || "",
        companyName: adminData.companyName || "",
        address: adminData.address || "",
        pincode: adminData.pincode || "",
        city: adminData.city || "",
        state: adminData.state || "",
        country: adminData.country || "",
        pancardNumber: adminData.pancardNumber || "",
        gstNumber: adminData.gstNumber || "",
      }));
    }
  }, [adminData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "license") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^\d{12}$/;

    setLoading(true);
    try {
      if (
        formData.pancardNumber &&
        !panRegex.test(formData.pancardNumber.toUpperCase())
      ) {
        setResult({
          success: false,
          message: "Invalid PAN card number. Format should be: ABCDE1234F",
        });
        return;
      }

      if (formData.aadharNumber && !aadharRegex.test(formData.aadharNumber)) {
        setResult({
          success: false,
          message: "Invalid Aadhar number. It should be a 12-digit number.",
        });
        return;
      }

      const token = localStorage.getItem("adminToken");
      const fd = new FormData();

      for (let key in formData) {
        fd.append(key, formData[key]);
      }

      const res = await updateAdmin(fd, token);
      console.log("Update response:", res);
      setResult(res);
    } catch (error) {
      console.log("Error updating admin ::::", error);
      setResult({
        success: false,
        message: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <InputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />
        <TextareaField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <InputField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <InputField
          label="PAN Card Number"
          name="pancardNumber"
          value={formData.pancardNumber}
          onChange={handleChange}
        />
        <InputField
          label="GST Number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
        />
        <InputField
          label="License"
          name="license"
          type="file"
          onChange={handleChange}
        />
        {adminData?.license && (
          <a
            className="text-blue-800 underline mb-4 block"
            href={adminData.license}
            target="_blank"
            rel="noreferrer"
          >
            Download License
          </a>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer 
    ${
      loading
        ? "bg-cyan-400 cursor-not-allowed"
        : "bg-cyan-600 hover:bg-cyan-500"
    }
    focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <p>Submit</p>
          )}
        </button>
      </form>
      <Toast
        result={result}
        setResult={setResult}
        color={"bg-green-500 text-white"}
      />
    </AdminLayout>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={type === "file" ? undefined : value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, required = false }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default ProfileSettings;
