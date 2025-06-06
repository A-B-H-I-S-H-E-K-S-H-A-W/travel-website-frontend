import React, { useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import { fetchAdmin, updateAdmin } from "../../services/ApiServices";
import { useParams } from "react-router-dom";
import Toast from "../../components/common/Toast";

const ProfileSettings = () => {
  const params = useParams();
  const [result, setResult] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const getAdminData = async () => {
    try {
      const data = await fetchAdmin(params.id);
      setAdminData(data);
    } catch (error) {
      console.log("ERROR :::", error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, [params.id]);

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
    const token = localStorage.getItem("adminToken");
    const fd = new FormData();

    for (let key in formData) {
      fd.append(key, formData[key]);
    }

    const res = await updateAdmin(fd, token);
    console.log("Update response:", res);
    setResult(res);
    // optionally show a toast or success message here
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

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
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
