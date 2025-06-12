import React, { useEffect, useState } from "react";
import SuperAdminLayout from "./layout/Layout";
import AdminCard from "../../components/admin/AdminCard";
import { useSuperAdminC } from "../../context/SuperAdminContext";

const VerifyServices = () => {
  const [adminData, setAdminData] = useState([]);

  const { fetchAdmins } = useSuperAdminC();

  const getAdmin = async () => {
    try {
      const data = await fetchAdmins({ verification: "Verification Pending" });
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
      <h2 className="text-2xl font-semibold p-4">Verify Services Page</h2>
      <AdminCard admin={adminData} isNewVerification={true} isVerify={false} />
    </SuperAdminLayout>
  );
};

export default VerifyServices;
