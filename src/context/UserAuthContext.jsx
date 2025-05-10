import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const register = async (userDetails) => {
    try {
      const res = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await res.json();
    } catch (err) {
      return { success: false, message: `${err.message} hello` };
    }
  };

  return (
    <UserAuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Optional: create a hook for easier context usage
export const useUserAuth = () => useContext(UserAuthContext);
