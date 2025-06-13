import React from "react";

const FlightInfoCard = ({ data, showActions = false, onEdit, onDelete }) => {
  if (!data) return null;

  const {
    flightNumber,
    airline,
    aircraftType,
    departureCity,
    arrivalCity,
    departureAirport,
    arrivalAirport,
    departureTime,
    arrivalTime,
    classType,
    totalSeats,
    availableSeats,
    mealIncluded,
    price,
    discount,
    images,
    status,
    isActive,
  } = data;

  return (
    <div className="block rounded-lg p-4 shadow-xl h-auto border border-gray-200 relative">
      <img
        alt={flightNumber}
        src={
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x200?text=No+Image"
        }
        className="h-48 w-full rounded-md object-cover"
      />

      <div className="mt-3">
        <h3 className="text-lg font-semibold">
          {airline} - {flightNumber}
        </h3>
        <p className="text-sm text-gray-600">
          {departureCity} ({departureAirport}) → {arrivalCity} ({arrivalAirport}
          )
        </p>

        <p className="text-xs mt-1 text-gray-500">
          Aircraft: {aircraftType} | Class: {classType}
        </p>
        <p className="text-xs text-gray-500">
          Departure: {new Date(departureTime).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          Arrival: {new Date(arrivalTime).toLocaleString()}
        </p>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-indigo-700 font-medium">
          <span className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            Seats: {availableSeats}/{totalSeats}
          </span>
          <span className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            Meal: {mealIncluded ? "Included" : "No Meal"}
          </span>
          <span className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            ₹{price} - {discount}% Off
          </span>
          <span className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            Status: {status}
          </span>
          <span className="bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onEdit && onEdit(data)}
              className="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(data)}
              className="px-4 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoCard;
