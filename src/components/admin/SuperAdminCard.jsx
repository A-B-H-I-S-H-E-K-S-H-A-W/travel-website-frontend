import { Trash2, User } from "lucide-react";
import { useSuperAdminC } from "../../context/SuperAdminContext";
import { useState } from "react";
import Toast from "../common/Toast";

const SuperAdminCard = ({ superAdminData }) => {
  if (!superAdminData || superAdminData.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-xl font-semibold">No Super Admins Found</p>
      </div>
    );
  }

  const { removeSuperAdmin } = useSuperAdminC();
  const [result, setResult] = useState(null);

  const removeData = async (id) => {
    const token = localStorage.getItem("superAdminToken");

    try {
      const response = await removeSuperAdmin({ token, id });

      if (response.success) {
        setResult(response);
        console.log("Successfully deleted:", response.data);
      } else {
        console.log("Failed to delete:", response.message);
      }
    } catch (error) {
      console.log("Error removing data ::::", error);
      return { success: false, message: "Error" };
    }
  };

  return (
    <div className="my-5">
      {superAdminData.map((admin, idx) => (
        <div key={idx} className="w-full rounded-xl border shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="rounded-full bg-blue-900 p-2 text-white w-10">
                <User />
              </div>
              <div className="text-base">
                <p>
                  <span className="font-bold">Username: </span>
                  {admin.username}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  {admin.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeData(admin._id)}
              className="rounded-full bg-red-600 p-2 text-white w-10 cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}

      <Toast result={result} setResult={setResult} />
    </div>
  );
};

export default SuperAdminCard;
