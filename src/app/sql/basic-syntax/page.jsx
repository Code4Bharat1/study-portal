import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import Navbar from "@/components/Navbar";
import BasicSyntax from "@/components/Sql/Syntax";
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
