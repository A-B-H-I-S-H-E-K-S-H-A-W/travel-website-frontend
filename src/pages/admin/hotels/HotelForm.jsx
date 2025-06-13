import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import Toast from "../../../components/common/Toast";

const HotelForm = () => {
  const { createApi } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    highlight: [""],
    rating: 0,
    address: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    checkInTime: "12:00",
    checkOutTime: "11:00",
    isActive: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "highlight") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else if (name === "images") {
      setFormData({ ...formData, [name]: Array.from(e.target.files) });
    } else if (name === "isActive") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await createApi("/api/hotel/create", formData, token);

      if (res.success) {
        setResult({
          success: true,
          message: res.message || "Hotel created successfully",
        });
      } else {
        setResult({
          success: false,
          message: res.message || "Something went wrong",
        });
      }
    } catch (error) {
      console.log("Error create hotel data ::::", error);
      setResult({ success: false, message: "Internal server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Create Hotel</h1>

        {/* Hotel Name */}
        <InputField
          label="Hotel Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Boutique">Boutique</option>
          </select>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hotel Highlights
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Free WiFi",
              "Swimming Pool",
              "Gym",
              "Spa",
              "Restaurant",
              "Parking",
              "Pet Friendly",
            ].map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="highlight"
                  value={feature}
                  checked={formData.highlight.includes(feature)}
                  onChange={(e) => {
                    const updatedHighlights = e.target.checked
                      ? [...formData.highlight, feature]
                      : formData.highlight.filter((h) => h !== feature);

                    setFormData({ ...formData, highlight: updatedHighlights });
                  }}
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <TextareaField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        {/* Landmark */}
        <InputField
          label="Landmark"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
        />

        {/* City */}
        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        {/* State */}
        <InputField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        {/* Country */}
        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        {/* Pincode */}
        <InputField
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        {/* Check-In Time */}
        <InputField
          label="Check-In Time"
          name="checkInTime"
          type="time"
          value={formData.checkInTime}
          onChange={handleChange}
        />

        {/* Check-Out Time */}
        <InputField
          label="Check-Out Time"
          name="checkOutTime"
          type="time"
          value={formData.checkOutTime}
          onChange={handleChange}
        />

        {/* Active Status */}
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

        {/* Images */}
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
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          type="submit"
          className={`cursor-pointer w-full  text-white py-2 px-4 rounded-md  ${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <Toast result={result} setResult={setResult} />
    </AdminLayout>
  );
};

// Reusable InputField Component
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
      className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
      {...rest}
    />
  </div>
);

// Reusable TextareaField Component
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
      className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export default HotelForm;
