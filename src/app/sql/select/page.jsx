import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import Navbar from "@/components/Navbar";
import DomMalContent from "@/components/Sql/Select";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <DomMalContent />
      </div>
    </div>
  );
}
