import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import Navbar from "@/components/Navbar";
import ArrayContent from "@/components/Sql/Where";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <ArrayContent />
      </div>
    </div>
  );
}
