import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import Toast from "../../../components/common/Toast";
import { useNavigate } from "react-router-dom";

const classTypes = ["Economy", "Premium Economy", "Business", "First"];
const statuses = ["Scheduled", "Delayed", "Cancelled", "Completed"];

const FlightForm = () => {
  const { createApi } = useAdminAuth();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    aircraftType: "",
    departureCity: "",
    arrivalCity: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    classType: "Economy",
    totalSeats: "",
    availableSeats: "",
    mealIncluded: false,
    price: "",
    discount: "",
    images: [],
    status: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await createApi("/api/flight/create", formData, token);

      if (res.success) {
        setResult({
          success: true,
          message: res.message || "Flight created successfully",
        });
      } else {
        setResult({
          success: false,
          message: res.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.error("Flight form submission error:", error);
      setResult({ success: false, message: "Internal server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form className="max-w-4xl space-y-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Flight Details Form
        </h1>

        {/* Text Inputs */}
        {[
          { label: "Flight Number", name: "flightNumber" },
          { label: "Airline", name: "airline" },
          { label: "Aircraft Type", name: "aircraftType" },
          { label: "Departure City", name: "departureCity" },
          { label: "Arrival City", name: "arrivalCity" },
          { label: "Departure Airport", name: "departureAirport" },
          { label: "Arrival Airport", name: "arrivalAirport" },
        ].map(({ label, name }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        ))}

        {/* Date-Time Inputs */}
        {["departureTime", "arrivalTime"].map((field) => (
          <InputField
            key={field}
            label={field.replace("Time", " Time")}
            name={field}
            type="datetime-local"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        {/* Dropdowns */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Class Type <span className="text-red-500">*</span>
          </label>
          <select
            name="classType"
            value={formData.classType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
            required
          >
            {classTypes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Seats */}
        {["totalSeats", "availableSeats"].map((field) => (
          <InputField
            key={field}
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            type="number"
            value={formData[field]}
            onChange={handleChange}
            required
            min={0}
          />
        ))}

        {/* Price and Discount */}
        {["price", "discount"].map((field) => (
          <InputField
            key={field}
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            type="number"
            value={formData[field]}
            onChange={handleChange}
            required
            min={0}
          />
        ))}

        {/* Meal */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="mealIncluded"
            checked={formData.mealIncluded}
            onChange={handleChange}
          />
          <label className="text-gray-700">Meal Included</label>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">
            Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
            required
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
            required
          >
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Active */}
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

        <button
          disabled={loading}
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-md  cursor-pointer ${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {result?.message ? (
        <Toast result={result} setResult={setResult} />
      ) : (
        <></>
      )}
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
  ...rest
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
      {...rest}
    />
  </div>
);

export default FlightForm;
