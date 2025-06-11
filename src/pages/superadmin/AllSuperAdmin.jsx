import React, { useEffect } from "react";
import SuperAdminLayout from "./layout/Layout";
import SuperAdminCard from "../../components/admin/SuperAdminCard";
import { useSuperAdminC } from "../../context/SuperAdminContext";

const AllSuperAdmin = () => {
  const { getSuperAdminsProfile, superAdmins } = useSuperAdminC();

  const token = localStorage.getItem("superAdminToken");
  useEffect(() => {
    console.log(token);

    if (token) {
      getSuperAdminsProfile(token);
    }
  }, []);

  return (
    <SuperAdminLayout>
      <h4 className="text-2xl font-semibold p-4">All Super Admin</h4>
      <SuperAdminCard superAdminData={superAdmins} />
    </SuperAdminLayout>
  );
};

export default AllSuperAdmin;
