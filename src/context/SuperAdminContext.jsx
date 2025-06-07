import { createContext, useContext, useEffect, useState } from "react";

export const SuperAdminContext = createContext();

export const SuperAdminProvider = ({ children }) => {
  const [currSuperAdmin, setCurrSuperAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("superadmin");
    if (storedUser) {
      setCurrSuperAdmin(JSON.parse(storedUser));
    }
  }, []);

  const registerOnce = async () => {
    try {
      const res = await fetch("/api/super-admin/register-once", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Register failed: ${res.status}`);
      }

      console.log("Registered Super Admin");

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("ERROR REGISTER ADMIN ::::", error.message);
      return { success: false, message: error.message };
    }
  };

  const login = async (superAdminData) => {
    try {
      const res = await fetch("/api/super-admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(superAdminData),
      });

      const data = await res.json();

      localStorage.setItem("superAdmin", JSON.stringify(data.superadmin));
      localStorage.setItem("superAdminToken", data.token);
      return data;
    } catch (error) {
      console.log("ERROR ::: ", error);
      return { success: false, message: error.message || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/super-admin/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("superAdmin");
      localStorage.removeItem("superAdminToken");
      setCurrSuperAdmin(null);
      return res;
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  };
  const register = async () => {};

  return (
    <SuperAdminContext.Provider
      value={{ currSuperAdmin, login, register, registerOnce, logout }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdminC = () => useContext(SuperAdminContext);
