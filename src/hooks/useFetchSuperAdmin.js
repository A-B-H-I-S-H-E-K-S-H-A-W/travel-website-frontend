import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useSuperAdminC } from "../context/SuperAdminContext";

// Custom hook to fetch admin from localStorage
export function useFetchSuperAdmin(superAdminToken) {
  const token = localStorage.getItem(superAdminToken);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const { profile } = useSuperAdminC();
  const getAdmin = async () => {
    if (token) {
      const res = await profile(token);
      setCurrentAdmin(res);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [superAdminToken, token, profile]);

  return currentAdmin;
}
