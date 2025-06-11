import { useState } from "react";
import Modal from "../common/Modal";
import Toast from "../common/Toast";

const AdminCard = ({ admin, isVerify, isNewVerification }) => {
  const [message, setMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClick = (message) => {
    if (!isModalOpen) {
      setAction(message);
      setMessage(`Are you sure you want to ${message} this Admin`);
      openModal();
    }
  };

  return (
    <>
      {admin &&
        admin.map((item, id) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-full mb-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {item.companyName}
            </h2>

            <div className="grid grid-cols-2 gap-2 text-base text-gray-700">
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
                {isVerify ? (
                  <button
                    onClick={() => handleClick("Denied")}
                    className="px-4 py-1 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-600"
                  >
                    Denied
                  </button>
                ) : (
                  <button
                    onClick={() => handleClick("Verify")}
                    className="px-4 py-1 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600"
                  >
                    Verify
                  </button>
                )}
                {isNewVerification ? (
                  <>
                    <button
                      onClick={() => handleClick("Denied")}
                      className="px-4 py-1 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-600"
                    >
                      Denied
                    </button>
                    <button
                      onClick={() => handleClick("Verify")}
                      className="px-4 py-1 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600"
                    >
                      Verify
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              message={message}
              action={action}
              onConfirm={(res) => setResult(res)}
            />

            <Toast result={result} setResult={setResult} />
          </div>
        ))}
      {!admin && (
        <>
          <div className="flex justify-center items-center h-[70vh]">
            <div className="mx-auto">
              <h4 className="text-xl font-semibold">No Data Found</h4>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminCard;
