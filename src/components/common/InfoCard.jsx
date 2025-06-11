const InfoCard = ({ data, showActions = false, onEdit, onDelete }) => {
  if (!data) return null;

  const {
    name,
    address,
    city,
    state,
    country,
    pincode,
    images,
    rating,
    description,
    highlight,
  } = data;

  return (
    <div className="block rounded-lg p-4 shadow-xl h-auto border border-gray-200 relative">
      <img
        alt={name}
        src={
          images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x200?text=No+Image"
        }
        className="h-48 w-full rounded-md object-cover"
      />

      <div className="mt-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          {address}, {city} - {pincode}, {state}, {country}
        </p>
        <p className="text-xs mt-1 text-gray-500">{description}</p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-cyan-700 font-medium">
          {highlight?.map((item, idx) => (
            <span
              key={idx}
              className="bg-cyan-50 border border-cyan-200 rounded-full px-3 py-1"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">Rating: ⭐ {rating}/5</div>

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

export default InfoCard;
