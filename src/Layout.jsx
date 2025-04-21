import React, { useState } from "react";
import Navbar from "./components/user/Navbar";
import Footer from "./components/user/Footer";

export default function Layout({ children, showFooter = true }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
