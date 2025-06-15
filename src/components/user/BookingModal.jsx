import React, { useState } from "react";
import Toast from "../common/Toast";
import { useUserAuth } from "../../context/UserAuthContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const BookingModal = ({ isOpen, onClose, booking }) => {
  const [travelDate, setTravelDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { createBooking } = useUserAuth();

  const handleBooking = async () => {
    if (!travelDate) {
      setResult({ success: false, message: "Please select a travel date." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        travelDate,
        bus: booking?.type === "bus" ? booking.data._id : null,
        hotel: booking?.type === "hotel" ? booking.data._id : null,
        flight: booking?.type === "flight" ? booking.data._id : null,
      };

      const token = localStorage.getItem("userToken");
      const response = await createBooking(payload, token);

      setResult(response);

      if (response?.success) {
        navigate("/checkout", {
          state: {
            bookingData: {
              ...booking.data,
              travelDate,
            },
          },
        });
      }
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: "Unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
        <p className="text-gray-600 mb-2">
          {booking.data.name || booking.data.busName || booking.data.airline}
        </p>
        <label className="block text-sm mb-2">Travel Date:</label>
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className={`cursor-pointer px-4 py-2 rounded text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book"}
          </button>
        </div>
      </div>
      <Toast result={result} setResult={setResult} />
    </div>
  );
};

export default BookingModal;
