import React from "react";
import Sidebar from "@/components/full-javascript-content/Sidebar";
import Navbar from "@/components/Navbar";
import BasicSyntax from "@/components/full-javascript-content/BasicSyntax";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <BasicSyntax />
      </div>
    </div>
  );
}
