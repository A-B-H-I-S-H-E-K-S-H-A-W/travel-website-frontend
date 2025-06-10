import { useState } from "react";
import { useSuperAdminC } from "../../context/SuperAdminContext";

const Modal = ({ isOpen, onClose, message, action, onConfirm }) => {
  const token = localStorage.getItem("adminToken");
  const { verificationUpdate } = useSuperAdminC();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const verifyStatus =
        action === "Verify" ? "Verified" : action === "Denied" ? "Denied" : "";

      const result = await verificationUpdate({
        token,
        verifyData: { verificationUpdate: verifyStatus },
      });

      if (onConfirm) onConfirm(result);
    } catch (error) {
      console.log("Error verifying admin ::::", error);
      const result = { success: false, message: "Verification Failed" };
      if (onConfirm) onConfirm(result);
    } finally {
      setLoading(false);
      onClose();
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
            className={`px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Yes"}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-1 rounded-md bg-red-500 hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
