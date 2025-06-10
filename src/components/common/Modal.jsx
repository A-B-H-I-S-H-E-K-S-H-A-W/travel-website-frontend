import { useSuperAdminC } from "../../context/SuperAdminContext";

const Modal = ({ isOpen, onClose, message, action, onConfirm }) => {
  const token = localStorage.getItem("adminToken");

  const { verificationUpdate } = useSuperAdminC();
  const handleConfirm = async () => {
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
      result = { success: false, message: "Verification Failed" };
      if (onConfirm) onConfirm(result);
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 px-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Warning</h2>

        <div>
          <p className="text-[15px]">
            <span className="font-bold">Message:</span> {message}
          </p>

          <div className="flex justify-end mt-5">
            <div className="flex gap-2 text-white">
              <button
                onClick={handleConfirm}
                className="px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
