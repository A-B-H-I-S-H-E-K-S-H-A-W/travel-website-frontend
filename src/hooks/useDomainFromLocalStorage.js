import { useEffect, useState } from "react";

// Custom hook to fetch admin from localStorage
export function useDomainFromLocalStorage(domain) {
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(domain);
    if (storedUser) {
      setCurrentAdmin(JSON.parse(storedUser));
    }
  }, [domain]);

  return currentAdmin;
}
