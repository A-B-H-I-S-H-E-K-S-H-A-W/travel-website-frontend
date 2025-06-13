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

  // API Calls

  const createApi = async (url, data, token = null) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key !== "images") {
          if (Array.isArray(data[key])) {
            data[key].forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, data[key]);
          }
        }
      }

      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      } else {
        throw new Error("No images uploaded");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // DON'T set Content-Type here
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create resource");
      }

      return result;
    } catch (error) {
      console.error("Create API Error:", error);
      return { success: false, message: error.message };
    }
  };

  const fetchApi = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Fetch error" };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.log("Error fetching data ::::", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  const getDataApi = async (url, token) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      return res.json();
    } catch (error) {
      console.error("GET fetch error:", error);
      return { success: false, message: "Fetch failed" };
    }
  };

  const updateApi = async (url, data, token) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          ...(data instanceof FormData
            ? { Authorization: `Bearer ${token}` }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }),
        },
        body: data instanceof FormData ? data : JSON.stringify(data),
      });

      const text = await response.text();

      // Check if response body is not empty
      if (!text) {
        return { success: false, message: "Empty response from server" };
      }

      const json = JSON.parse(text);
      return json;
    } catch (error) {
      console.error("Update API Error:", error);
      return { success: false, message: "Update failed" };
    }
  };

  const deleteApi = async (url, token) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("DELETE API Error :::", error);
      return { success: false, message: "Something went wrong." };
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
        createApi,
        fetchApi,
        getDataApi,
        updateApi,
        deleteApi,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Optional: create a hook for easier context usage
export const useAdminAuth = () => useContext(AdminAuthContext);
