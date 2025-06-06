import { useEffect, useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

// Custom hook to fetch admin from localStorage
export function useDomainFromLocalStorage(domainToken) {
  const token = localStorage.getItem(domainToken);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const { fetchAdmin } = useAdminAuth();

  const getAdmin = async () => {
    if (token) {
      const res = await fetchAdmin(token);
      setCurrentAdmin(res);
    }
  };

  useEffect(() => {
    getAdmin();
  }, [domainToken, token, fetchAdmin]);

  return currentAdmin;
}
