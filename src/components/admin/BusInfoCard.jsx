import React from "react";

const BusInfoCard = ({ data, showActions = false, onEdit, onDelete }) => {
  if (!data) return null;

  let {
    busNumber,
    busName,
    source,
    destination,
    departureTime,
    arrivalTime,
    duration,
    totalSeats,
    availableSeats,
    fare,
    busType,
    operatingDays,
    images,
    isActive,
  } = data;

  const getMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = getMinutes(departureTime);
  const endMinutes = getMinutes(arrivalTime);
  let diff = endMinutes - startMinutes;

  if (diff < 0) diff += 24 * 60;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  duration = `${hours}h ${minutes}m`;

  return (
    <div className="block rounded-lg p-4 shadow-xl h-auto border border-gray-200 relative">
      <img
        alt={busName}
        src={
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x200?text=No+Image"
        }
        className="h-48 w-full rounded-md object-cover"
      />

      <div className="mt-3">
        <h3 className="text-lg font-semibold">
          {busName} <span className="text-sm text-gray-500">({busNumber})</span>
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {source} ➝ {destination}
        </p>
        <p className="text-xs text-gray-500 mb-1">
          Departure: {departureTime} | Arrival: {arrivalTime} | Duration:{" "}
          {duration}
        </p>
        <p className="text-xs text-gray-500 mb-1">
          Seats: {availableSeats}/{totalSeats} | Fare: ₹{fare}
        </p>

        <div className="mt-2 text-xs font-medium text-blue-800">
          Type: {busType}
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-green-700 font-medium">
          {operatingDays?.map((day, idx) => (
            <span
              key={idx}
              className="bg-green-50 border border-green-200 rounded-full px-3 py-1"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="mt-3 text-sm">
          Status:{" "}
          <span
            className={`font-semibold ${
              isActive ? "text-green-600" : "text-red-500"
            }`}
          >
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

export default BusInfoCard;
