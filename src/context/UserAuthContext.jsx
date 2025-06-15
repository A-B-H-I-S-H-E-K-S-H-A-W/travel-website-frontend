import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const openModal = (bookingData) => {
    setSelectedBooking(bookingData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = async () => {
    const res = await fetch("/api/users/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setCurrentUser(null);
    return res;
  };

  const register = async (userDetails) => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: `${err.message}` };
    }
  };

  const login = async (userData) => {
    try {
      const res = await fetch("/api/users/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        return data;
      } else {
        return { success: false, message: `Wrong email or password` };
      }
    } catch (error) {
      return { success: false, message: `${error.message}` };
    }
  };

  const update = async (url, data, token) => {
    try {
      const isFormData = data instanceof FormData;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          ...(isFormData
            ? { Authorization: `Bearer ${token}` }
            : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }),
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (res.ok) {
        const responseData = await res.json();
        return responseData;
      }

      return { success: false, message: "Error occur during updation" };
    } catch (error) {
      console.log("Error updating user ::::", error);
      return { success: false, message: "Internal server error" };
    }
  };

  const getUser = async (url, token) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.log("Error fetching Info ::::", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  const fetchDashboardCard = async (url) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res) return res.json();
    } catch (err) {
      console.error("❌ Failed to fetch dashboard data", err);
    }
  };

  const fetchDataInfo = async (url) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.log("Error fetching Info ::::", error);
      return { success: false, message: "Internal Server Error" };
    }
  };

  const fetchSearchData = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: `error data ${errorData}` };
      }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error("Search error:", err.message);
    }
  };

  const createBooking = async (payload, token) => {
    try {
      const res = await fetch("/api/booking/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errRes = await res.json();
        return { success: false, message: errRes.message || "Booking failed." };
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Error creating booking:", error.message);
      return { success: false, message: "Internal Server Error" };
    }
  };

  const fetchBookings = async (url, token) => {
    if (!url) return;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(
          "API responded with error:",
          data.message || res.statusText
        );
        return null;
      }

      return data.success ? data.data : null;
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      return null;
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        register,
        fetchDashboardCard,
        fetchDataInfo,
        update,
        getUser,
        fetchSearchData,
        createBooking,
        showModal,
        selectedBooking,
        openModal,
        closeModal,
        fetchBookings,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
