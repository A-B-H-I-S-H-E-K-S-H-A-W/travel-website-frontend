import { Heart, Star } from "lucide-react";
import img from "../../assets/images/bg.jpg";
import { ButtonOutline, ButtonSolid } from "../../components/common/Button";
import ImagesCarousel from "../../components/user/ImagesCarousel";
import { useParams } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";

const InfoPage = () => {
  const { id } = useParams();
  const { fetchDataInfo } = useUserAuth();
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetchDataInfo(`/api/fetch/info/${id}`);

      if (res) {
        setData(res);
      }
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="bg-white shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={img}
            alt="Product image"
            className="w-full h-40 md:h-62 object-cover"
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200">
            <Heart size={15} />
          </button>
        </div>
        {loading ? (
          <>
            <div className="flex items-center justify-center h-[60vh] bg-white">
              <Loader />
            </div>
          </>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 py-10 px-5 md:px-20">
            {data && data.type === "bus" && (
              <>
                <div>
                  {/* Carousel */}
                  <ImagesCarousel image={data.data.images} />
                </div>
                <div className="px-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {data.data.busName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {data.data.busNumber}
                      </p>
                    </div>
                  </div>
                  <div className="py-2">
                    <p className="text-lg font-bold text-green-600">
                      ₹{data.data.fare}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{data.data.fare - 100}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    Remaining Seats: {data.data.availableSeats}/
                    {data.data.totalSeats}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {data.data.source} to {data.data.destination}
                  </p>
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="text-gray-600 text-sm mb-2">
                        Departure Time: {data.data.departureTime}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Arrival Time: {data.data.arrivalTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-2">
                        Duration: {data.data.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 font-semibold">Available On:</p>
                  <div className="flex items-center justify-between my-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 flex gap-2">
                        {data.data.operatingDays.map((item, idx) => (
                          <div
                            className="px-3 py-1 rounded-3xl bg-blue-400 text-white"
                            key={idx}
                          >
                            <span>{item}</span>
                          </div>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">In Stock</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <ButtonSolid
                      title={"Book"}
                      className={"flex-1 px-4 py-2 rounded-full"}
                    />
                    <ButtonOutline
                      title={"Quick View"}
                      className={"px-4 py-2 rounded-full"}
                    />
                  </div>
                </div>
              </>
            )}
            {data && data.type === "hotel" && (
              <>
                <div>
                  {/* Carousel */}
                  <ImagesCarousel image={data.data.images} />
                </div>
                <div className="px-5">
                  <div className="flex justify-between items-start my-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {data.data.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {data.data.category} Hotel
                      </p>
                      <p className="text-sm text-gray-600">
                        {data.data.address}, {data.data.city}, {data.data.state}
                        , {data.data.country} - {data.data.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    Rating: {data.data.rating || 0}⭐
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    {data.data.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                    <p>
                      <strong>Check-In:</strong> {data.data.checkInTime}
                    </p>
                    <p>
                      <strong>Check-Out:</strong> {data.data.checkOutTime}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {data.data.landmark}
                    </p>
                  </div>

                  <p className="text-gray-700 font-semibold">Highlights:</p>
                  <div className="flex flex-wrap gap-2 my-3">
                    {data.data.highlight.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-3xl bg-blue-400 text-white text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between my-4">
                    <span className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          data.data.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.data.isActive ? "Available" : "Unavailable"}
                      </span>
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <ButtonSolid
                      title={"Check Price"}
                      className={"flex-1 px-4 py-2 rounded-full"}
                    />
                    <ButtonOutline
                      title={"See Available Rooms"}
                      className={"px-4 py-2 rounded-full"}
                    />
                  </div>
                </div>
              </>
            )}
            {data && data.type === "flight" && (
              <>
                <div>
                  {/* Carousel */}
                  <ImagesCarousel image={data.data.images} />
                </div>
                <div className="px-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-1">
                        {data.data.airline}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Flight No: {data.data.flightNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Aircraft: {data.data.aircraftType} | Class:{" "}
                        {data.data.classType}
                      </p>
                    </div>
                  </div>

                  <div className="py-2">
                    <p className="text-lg font-bold text-green-600">
                      ₹{data.data.finalAmount}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{data.data.price}
                    </p>
                  </div>

                  <div className="flex items-center mb-2">
                    Seats Available: {data.data.availableSeats}/
                    {data.data.totalSeats}
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    {data.data.departureCity} ({data.data.departureAirport}) ➝{" "}
                    {data.data.arrivalCity} ({data.data.arrivalAirport})
                  </p>

                  <div className="grid grid-cols-2 text-sm text-gray-700 mb-4">
                    <p>
                      <strong>Departure:</strong>{" "}
                      {new Date(data.data.departureTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>Arrival:</strong>{" "}
                      {new Date(data.data.arrivalTime).toLocaleString()}
                    </p>
                    <p>
                      <strong>Duration:</strong> {data.data.duration}
                    </p>
                    <p>
                      <strong>Meal:</strong>{" "}
                      {data.data.mealIncluded ? "Included" : "Not Included"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          data.data.status === "Scheduled"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {data.data.status}
                      </span>
                    </span>
                    <span className="text-sm text-gray-600">
                      {data.data.isActive ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <ButtonSolid
                      title={"Book"}
                      className={"flex-1 px-4 py-2 rounded-full"}
                    />
                    <ButtonOutline
                      title={"Quick View"}
                      className={"px-4 py-2 rounded-full"}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPage;
