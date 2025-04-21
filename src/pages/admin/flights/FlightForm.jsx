import React, { useState } from "react";
import FlightDashboard from "./Layout";

const FlightForm = () => {
  const [formData, setFormData] = useState({
    flightid: "",
    origin: "",
    airline: "",
    avability: "",
    destination: "",
    arrival: "",
    departure: "",
    class: [""],
    price: 0,
    connectingSite: "",
    preferences: "",
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
    console.log("Submitted Form Data:", formData);
  };

  return (
    <FlightDashboard>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Flight Details Form
        </h1>

        {/* Flight ID */}
        <div className="mb-4">
          <label
            htmlFor="flightid"
            className="block text-sm font-medium text-gray-700"
          >
            Flight ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="flightid"
            name="flightid"
            value={formData.flightid}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Origin */}
        <div className="mb-4">
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700"
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

        {/* Airline */}
        <div className="mb-4">
          <label
            htmlFor="airline"
            className="block text-sm font-medium text-gray-700"
          >
            Airline <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="airline"
            name="airline"
            value={formData.airline}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label
            htmlFor="avability"
            className="block text-sm font-medium text-gray-700"
          >
            Availability Date
          </label>
          <input
            type="date"
            id="avability"
            name="avability"
            value={formData.avability}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Destination */}
        <div className="mb-4">
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700"
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

        {/* Arrival */}
        <div className="mb-4">
          <label
            htmlFor="arrival"
            className="block text-sm font-medium text-gray-700"
          >
            Arrival Date
          </label>
          <input
            type="datetime-local"
            id="arrival"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Departure */}
        <div className="mb-4">
          <label
            htmlFor="departure"
            className="block text-sm font-medium text-gray-700"
          >
            Departure Date
          </label>
          <input
            type="datetime-local"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Class */}
        <div className="mb-4">
          <label
            htmlFor="class"
            className="block text-sm font-medium text-gray-700"
          >
            Class
          </label>
          <input
            type="text"
            id="class"
            name="class"
            value={formData.class}
            onChange={handleChange}
            placeholder="E.g., Economy, Business"
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Connecting Site */}
        <div className="mb-4">
          <label
            htmlFor="connectingSite"
            className="block text-sm font-medium text-gray-700"
          >
            Connecting Site
          </label>
          <input
            type="text"
            id="connectingSite"
            name="connectingSite"
            value={formData.connectingSite}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Preferences */}
        <div className="mb-4">
          <label
            htmlFor="preferences"
            className="block text-sm font-medium text-gray-700"
          >
            Preferences
          </label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
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
    </FlightDashboard>
  );
};

export default FlightForm;
