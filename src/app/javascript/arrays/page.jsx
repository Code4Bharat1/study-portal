import React from "react";
import Sidebar from "@/components/Javascript/Sidebar";
import Navbar from "@/components/Navbar";
import ArrayContent from "@/components/Javascript/Arrays";
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
