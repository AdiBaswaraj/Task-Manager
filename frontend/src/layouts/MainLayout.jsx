import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="relative bg-black text-white min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main className="px-4 md:px-8 py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
