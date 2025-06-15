const InfoCard = ({ data }) => {
  const travelType = data.bus
    ? "Bus"
    : data.hotel
    ? "Hotel"
    : data.flight
    ? "Flight"
    : "Trip";

  const name =
    data?.bus?.busName || data?.hotel?.name || data?.flight?.airline || "Trip";

  const image =
    data?.bus?.images?.[0] ||
    data?.hotel?.images?.[0] ||
    data?.flight?.images?.[0] ||
    "https://via.placeholder.com/300";

  const city =
    data?.bus?.departureCity ||
    data?.hotel?.city ||
    data?.flight?.departureCity ||
    "--";

  const destination =
    data?.bus?.destination || data?.flight?.arrivalCity || "Unknown";

  const price =
    data.finalAmount || data?.bus?.fare || data?.flight?.fare || "--";

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <img
        src={image}
        alt="Trip"
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600">
        {city} → {destination}
      </p>
      <p className="text-gray-500">
        Travel Date: {new Date(data.travelDate).toLocaleDateString()}
      </p>
      <p className="text-blue-600 font-semibold mt-2">₹ {price}</p>
    </div>
  );
};

export default InfoCard;
