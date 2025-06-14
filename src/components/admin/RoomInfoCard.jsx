const RoomInfoCard = ({ data, showActions = false, onEdit, onDelete }) => {
  if (!data) return null;

  const {
    hotel,
    bedType,
    maxPerson,
    facilities,
    discount,
    price,
    discountedAmount,
    payment,
    images,
    totalRooms,
    booked,
  } = data;

  return (
    <div className="block rounded-lg p-4 shadow-xl h-auto border border-gray-200 relative">
      <p className="text-sm text-gray-800">
        <span className="font-bold">Hotel:</span> {hotel?.name}
      </p>
      <img
        alt={bedType}
        src={
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x200?text=No+Image"
        }
        className="h-48 w-full rounded-md object-cover"
      />

      <div className="mt-3">
        <h3 className="text-lg font-semibold">{bedType} Room</h3>
        <p className="text-sm text-gray-600">
          Max Persons: {maxPerson} | Total Rooms: {totalRooms}
        </p>

        <p className="text-sm mt-1 text-gray-500">
          Payment: <strong>{payment}</strong>
        </p>
        <p className="text-sm mt-1 text-gray-500">
          Price: ₹{price} | Discount: {discount}% | Final: ₹{discountedAmount}
        </p>
        <p className="text-sm mt-1 text-gray-500">
          Status:{" "}
          <span className={booked ? "text-red-600" : "text-green-600"}>
            {booked ? "Booked" : "Available"}
          </span>
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-cyan-700 font-medium">
          {facilities?.map((item, idx) => (
            <span
              key={idx}
              className="bg-cyan-50 border border-cyan-200 rounded-full px-3 py-1"
            >
              {item}
            </span>
          ))}
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

export default RoomInfoCard;
