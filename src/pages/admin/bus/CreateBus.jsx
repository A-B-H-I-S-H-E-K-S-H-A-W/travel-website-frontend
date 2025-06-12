import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import Toast from "../../../components/common/Toast";

// Enum values (match the ones in your Mongoose schema)
const BUS_TYPES = ["AC Sleeper", "Non-AC Seater", "Sleeper", "AC Seater"];
const OPERATING_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BusForm = () => {
  const { createApi } = useAdminAuth();
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    busNumber: "",
    busName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    availableSeats: "",
    fare: "",
    busType: [],
    operatingDays: [],
    isActive: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "busType" || name === "operatingDays") {
      const updated = checked
        ? [...formData[name], value]
        : formData[name].filter((item) => item !== value);
      setFormData({ ...formData, [name]: updated });
    } else if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await createApi("/api/bus/create", formData, token);
      if (res.success) {
        setResult({ success: true, message: res.message });
      } else {
        setResult({
          success: false,
          message: res.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Create Bus Error:", error);
      setResult({ success: false, message: "Internal server error" });
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold mb-6">Create Bus Schedule</h1>

        <InputField
          label="Bus Number"
          name="busNumber"
          value={formData.busNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label="Bus Name"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
        />
        <InputField
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <InputField
          type="datetime-local"
          label="Departure Time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />
        <InputField
          type="datetime-local"
          label="Arrival Time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          label="Total Seats"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          label="Fare (INR)"
          name="fare"
          value={formData.fare}
          onChange={handleChange}
          required
        />

        {/* Bus Type Checkboxes */}
        <CheckboxGroup
          label="Bus Type"
          name="busType"
          options={BUS_TYPES}
          selected={formData.busType}
          onChange={handleChange}
        />

        {/* Operating Days Checkboxes */}
        <CheckboxGroup
          label="Operating Days"
          name="operatingDays"
          options={OPERATING_DAYS}
          selected={formData.operatingDays}
          onChange={handleChange}
        />

        {/* Is Active Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Is Active
          </label>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <Toast result={result} setResult={setResult} />
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
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
    />
  </div>
);

const CheckboxGroup = ({ label, name, options, selected, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={selected.includes(option)}
            onChange={onChange}
            className="cursor-pointer"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default BusForm;
