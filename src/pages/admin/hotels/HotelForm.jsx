import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const HotelForm = () => {
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
    images: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "highlight" || name === "images") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else if (name === "isActive") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <AdminLayout>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Hotel Details Form</h1>

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
        <InputField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        {/* Highlights */}
        <InputField
          label="Highlights (comma-separated)"
          name="highlight"
          value={formData.highlight.join(",")}
          onChange={handleChange}
        />

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
        <InputField
          label="Image URLs (comma-separated)"
          name="images"
          value={formData.images.join(",")}
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
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
