import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    const token = localStorage.getItem("adminToken");

    if (storedUser) {
      setCurrentAdmin(JSON.parse(storedUser));
    }

    if (token) {
      fetchAdmin(token); // fetch only once
    }
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      setCurrentAdmin(null);
      return res;
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  };

  const register = async (adminDetails) => {
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminDetails),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: `${err.message}` };
    }
  };

  const login = async (adminData) => {
    try {
      console.log("error2");

      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setCurrentAdmin(data.admin); // ✅ correct object

        await fetchAdmin(data.token); // ✅ manually fetch profile

        return data;
      } else {
        return { success: false, message: `Email not found, Please Register` };
      }
    } catch (error) {
      return { success: false, message: `${error.message}` };
    }
  };

  const fetchAdmin = async (token) => {
    try {
      const res = await fetch(`/api/admin/profile`, {
        method: "GET", // should be GET, not POST!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required by many backends
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch admin: ${res.status}`);
      }

      const data = await res.json();
      setAdminData(data);
      return data;
    } catch (error) {
      console.error("Verify Admin Error:", error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    const token = localStorage.getItem("adminToken");

    if (storedUser) {
      setCurrentAdmin(JSON.parse(storedUser));
    }

    if (token) {
      fetchAdmin(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        currentAdmin,
        login,
        logout,
        register,
        fetchAdmin,
        adminData,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Optional: create a hook for easier context usage
export const useAdminAuth = () => useContext(AdminAuthContext);
