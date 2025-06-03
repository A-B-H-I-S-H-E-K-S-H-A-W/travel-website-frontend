import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setCurrentAdmin(JSON.parse(storedUser));
    }
  }, []);

  const logout = async () => {};

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
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminToken", JSON.stringify(data.token));
        localStorage.setItem("admin", JSON.stringify(data.admin));
        setCurrentUser(data.user);
        return data;
      } else {
        return { success: false, message: `Email not found, Please Register` };
      }
    } catch (error) {
      return { success: false, message: `${error.message}` };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ currentAdmin, login, logout, register }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Optional: create a hook for easier context usage
export const useAdminAuth = () => useContext(AdminAuthContext);
