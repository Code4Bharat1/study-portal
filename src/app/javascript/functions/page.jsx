import React from "react";
import Sidebar from "@/components/Javascript/Sidebar";
import Navbar from "@/components/Navbar";
import FunctionContent from "@/components/Javascript/Functions";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <FunctionContent />
      </div>
    </div>
  );
}
