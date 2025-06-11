import React, { useEffect, useState } from "react";
import SuperAdminLayout from "./layout/Layout";
import { useSuperAdminC } from "../../context/SuperAdminContext";
import AdminCard from "../../components/admin/AdminCard";

const VerifiedServices = () => {
  const [adminData, setAdminData] = useState([]);

  const { fetchAdmins } = useSuperAdminC();

  const getAdmin = async () => {
    try {
      const data = await fetchAdmins({ verification: "Verified" });
      setAdminData(data.admin);
    } catch (error) {
      console.log("Error fetching admin data ::::", error);
      return { success: false, message: "Error fetching admin" };
    }
  };

  useEffect(() => {
    getAdmin();
  }, [adminData, setAdminData]);

  return (
    <SuperAdminLayout>
      <h2 className="text-2xl font-semibold p-4">Verified Services Page</h2>
      <AdminCard admin={adminData} isVerify={true} isNewVerification={false} />
    </SuperAdminLayout>
  );
};

export default VerifiedServices;
