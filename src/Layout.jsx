import React, { useEffect, useState } from "react";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

export default function Layout({ children, showFooter = true }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar user={user} />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
