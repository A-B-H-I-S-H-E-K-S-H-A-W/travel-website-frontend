import React, { useState } from "react";
import BusDashboard from "./Layout";

const BusForm = () => {
  const [formData, setFormData] = useState({
    numberPlate: "",
    busType: "",
    origin: "",
    seatsAvailable: 0,
    destination: "",
    price: 0,
    arrival: "",
    departure: "",
    availability: true,
    driver: "",
    driverDetails: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <BusDashboard>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Bus Details Form</h1>

        {/* Number Plate */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="numberPlate"
          >
            Number Plate <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="numberPlate"
            name="numberPlate"
            value={formData.numberPlate}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Bus Type */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="busType"
          >
            Bus Type
          </label>
          <input
            type="text"
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Origin */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="origin"
          >
            Origin <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="destination"
          >
            Destination <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Seats Available */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="seatsAvailable"
          >
            Seats Available
          </label>
          <input
            type="number"
            id="seatsAvailable"
            name="seatsAvailable"
            value={formData.seatsAvailable}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="price"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Arrival and Departure */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="arrival"
          >
            Arrival
          </label>
          <input
            type="text"
            id="arrival"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="departure"
          >
            Departure
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </label>
        </div>

        {/* Driver */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="driver"
          >
            Driver
          </label>
          <input
            type="text"
            id="driver"
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Driver Details */}
        <div className="mb-4">
          <label
            className="block text-md font-medium text-gray-700"
            htmlFor="driverDetails"
          >
            Driver Details
          </label>
          <textarea
            id="driverDetails"
            name="driverDetails"
            value={formData.driverDetails}
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
    </BusDashboard>
  );
};

export default BusForm;
