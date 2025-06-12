import { useState } from "react";
import Modal from "../common/Modal";
import Toast from "../common/Toast";
import { useSuperAdminC } from "../../context/SuperAdminContext";

const AdminCard = ({ admin, isVerify, isNewVerification }) => {
  const { verificationUpdate } = useSuperAdminC();

  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const openModal = (adminData, actionType) => {
    setSelectedAdmin(adminData);
    setSelectedAction(actionType);
    setMessage(`Are you sure you want to ${actionType} this Admin?`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    setSelectedAction("");
  };

  const confirmAction = async (adminData, actionType) => {
    const token = localStorage.getItem("adminToken");
    const verifyStatus =
      actionType === "Verify"
        ? "Verified"
        : actionType === "Denied"
        ? "Denied"
        : "";

    try {
      const res = await verificationUpdate({
        token,
        verifyData: {
          verificationUpdate: verifyStatus,
          adminId: adminData?._id,
        },
      });

      setResult(res);
      closeModal();
      return res;
    } catch (error) {
      console.log("Verification failed:", error);
      return { success: false, message: "Verification Failed" };
    }
  };

  return (
    <>
      {admin && admin.length > 0 ? (
        admin.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-full mb-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {item.companyName}
            </h2>
            <div className="grid md:grid-cols-2 gap-2 text-base text-gray-700">
              <p>
                <span className="font-bold">Username:</span> {item.username}
              </p>
              <p>
                <span className="font-bold">Email:</span> {item.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {item.phoneNumber}
              </p>
              <p>
                <span className="font-bold">Address:</span> {item.address},{" "}
                {item.city}: {item.pincode}
              </p>
              <p>
                <span className="font-bold">State:</span> {item.state}
              </p>
              <p>
                <span className="font-bold">Country:</span> {item.country}
              </p>
              <p>
                <span className="font-bold">PAN:</span> {item.pancardNumber}
              </p>
              <p>
                <span className="font-bold">GST:</span> {item.gstNumber}
              </p>
              <p>
                <span className="font-bold">Domain:</span> {item.domain}
              </p>
              <p>
                <span className="font-bold">License:</span>{" "}
                <a
                  className="text-blue-800 underline"
                  href={item.license}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download License
                </a>
              </p>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="mt-4 text-xs text-gray-500">
                Created at: {new Date(item.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-3">
                {isNewVerification && !isVerify ? (
                  <>
                    <button
                      onClick={() => openModal(item, "Verify")}
                      className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => openModal(item, "Denied")}
                      className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                      Denied
                    </button>
                  </>
                ) : null}
                {!isNewVerification ? (
                  isVerify ? (
                    <button
                      onClick={() => openModal(item, "Denied")}
                      className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                      Denied
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal(item, "Verify")}
                      className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    >
                      Verify
                    </button>
                  )
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <h4 className="text-xl font-semibold">No Data Found</h4>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={message}
        onConfirm={() => confirmAction(selectedAdmin, selectedAction)}
      />

      <Toast result={result} setResult={setResult} />
    </>
  );
};

export default AdminCard;
