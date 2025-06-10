import { createContext, useContext, useEffect, useState } from "react";

export const SuperAdminContext = createContext();

export const SuperAdminProvider = ({ children }) => {
  const [currSuperAdmin, setCurrSuperAdmin] = useState(() => {
    const storedUser = localStorage.getItem("superAdmin");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

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

  const profile = async (token) => {
    try {
      const res = await fetch("/api/super-admin/profile", {
        method: "GET", // should be GET, not POST!
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required by many backends
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const newRegistration = async (superAdminData, token) => {
    try {
      const res = await fetch("/api/super-admin/new-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(superAdminData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Can't register new super admin", error);
    }
  };

  const fetchAdmins = async (verification) => {
    try {
      const res = await fetch("/api/admin/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verification),
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.log("Error fteching admin  ::::", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  const verificationUpdate = async ({ token, verifyData }) => {
    try {
      const res = await fetch("/api/admin/verification-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(verifyData),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server Error:", text); // 👈 this is helpful
        throw new Error("Server returned an error"); // 👈 this triggers your log
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error fetching admin verification ::::", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  return (
    <SuperAdminContext.Provider
      value={{
        currSuperAdmin,
        login,
        newRegistration,
        registerOnce,
        logout,
        profile,
        fetchAdmins,
        verificationUpdate,
      }}
    >
      {children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdminC = () => useContext(SuperAdminContext);
