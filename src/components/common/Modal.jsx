import { useState } from "react";
import Toast from "../common/Toast";

const CreateSuperAdminModal = ({ isOpen, onClose }) => {
  const [result, setResult] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 px-5">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Warning</h2>


        <p>Message: </p>

        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <Toast result={result} setResult={setResult} />
    </div>
  );
};

export default CreateSuperAdminModal;
