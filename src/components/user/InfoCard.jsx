import { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import Modal from "../common/Modal";
import Toast from "../common/Toast";

const InfoCard = ({ data, onRefresh }) => {
  const { cancelBooking } = useUserAuth();
  const travelDate = new Date(data.travelDate);
  const currentDate = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const token = localStorage.getItem("userToken");

  const confirmCancel = async () => {
    const res = await cancelBooking(`/api/booking/cancel/${data._id}`, token);
    if (res.success) {
      setResult(res);
      onRefresh?.();
    } else {
      setResult({
        success: false,
        message: res.message,
      });
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <img
        src={
          data?.bus?.images?.[0] ||
          data?.hotel?.images?.[0] ||
          data?.flight?.images?.[0]
        }
        alt="Trip"
        className="h-40 w-full object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold">
        {data?.bus?.busName || data?.hotel?.name || data?.flight?.airline}
      </h3>
      <p className="text-gray-600">
        {data?.bus?.departureCity || data?.hotel?.city} →
        {data?.bus?.destination || data?.flight?.arrivalCity}
      </p>
      <p className="text-gray-500">
        Travel Date: {travelDate.toLocaleDateString()}
      </p>
      <p className="text-blue-600 font-semibold mt-2">₹ {data.finalAmount}</p>

      {travelDate >= currentDate && (
        <>
          <button
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={handleCancelClick}
          >
            Cancel Booking
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message="Are you sure you want to cancel this booking?"
            onConfirm={confirmCancel}
          />
        </>
      )}

      <Toast result={result} setResult={setResult} />
    </div>
  );
};

export default InfoCard;
