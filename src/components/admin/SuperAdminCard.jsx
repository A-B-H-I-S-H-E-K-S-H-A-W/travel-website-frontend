import { User } from "lucide-react";
import React from "react";

const SuperAdminCard = ({ superAdminData }) => {
  if (!superAdminData || superAdminData.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-xl font-semibold">No Super Admins Found</p>
      </div>
    );
  }

  return (
    <div className="my-5">
      {superAdminData.map((admin, idx) => (
        <div key={idx} className="w-full rounded-xl border shadow-lg p-4 mb-6">
          <div className="flex gap-5 items-center">
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
        </div>
      ))}
    </div>
  );
};

export default SuperAdminCard;
