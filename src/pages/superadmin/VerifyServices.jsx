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
  }, []);

  return (
    <SuperAdminLayout>
      <AdminCard admin={adminData} />
    </SuperAdminLayout>
  );
};

export default VerifyServices;
