import React from "react";
import Sidebar from "@/components/full-javascript-content/Sidebar";
import GetStartedPage from "@/components/full-javascript-content/GetStarted";
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
