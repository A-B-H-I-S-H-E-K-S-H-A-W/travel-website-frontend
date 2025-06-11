import { useState } from "react";

const Modal = ({ isOpen, onClose, message, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const result = await onConfirm?.(); // Execute passed callback
      console.log("Modal Confirm Result:", result);
    } catch (error) {
      console.error("Error in modal confirmation:", error);
    } finally {
      setLoading(false);
      onClose(); // Close modal after confirm
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Warning</h2>
        <p className="text-[15px]">
          <span className="font-bold">Message:</span> {message}
        </p>

        <div className="flex justify-end mt-5 gap-2 text-white">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Yes"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-1 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
