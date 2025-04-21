import React, { useState } from "react";
import HotelDashboardLayout from "./Layout";

const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    landmark: [""],
    city: "",
    state: "",
    country: "",
    pincode: "",
    freeCancellation: false,
    facilities: [""],
    ratings: 0,
    photos: "",
    rooms: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle array fields (landmark, facilities)
    if (name === "landmark" || name === "facilities") {
      setFormData({
        ...formData,
        [name]: value.split(","),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <HotelDashboardLayout>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Hotel Details Form</h1>

        {/* Hotel Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Hotel Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Landmark */}
        <div className="mb-4">
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700"
          >
            Landmark (comma-separated)
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark.join(",")}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Pincode */}
        <div className="mb-4">
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700"
          >
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Free Cancellation */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="freeCancellation"
              checked={formData.freeCancellation}
              onChange={handleChange}
              className="mr-2"
            />
            Free Cancellation
          </label>
        </div>

        {/* Facilities */}
        <div className="mb-4">
          <label
            htmlFor="facilities"
            className="block text-sm font-medium text-gray-700"
          >
            Facilities (comma-separated)
          </label>
          <input
            type="text"
            id="facilities"
            name="facilities"
            value={formData.facilities.join(",")}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Ratings */}
        <div className="mb-4">
          <label
            htmlFor="ratings"
            className="block text-sm font-medium text-gray-700"
          >
            Ratings (0-5)
          </label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            min="0"
            max="5"
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Photos */}
        <div className="mb-4">
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700"
          >
            Photos (URL)
          </label>
          <input
            type="url"
            id="photos"
            name="photos"
            value={formData.photos}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </HotelDashboardLayout>
  );
};

export default HotelForm;
