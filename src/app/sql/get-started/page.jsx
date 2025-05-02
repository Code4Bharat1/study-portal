import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import GetStartedPage from "@/components/Sql/GetStarted";
import Navbar from "@/components/Navbar";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <GetStartedPage />
      </div>
    </div>
  );
}
