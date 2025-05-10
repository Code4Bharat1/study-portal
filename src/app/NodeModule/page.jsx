import Sidebar from "@/components/fullnodecontent/nodesidebar";
import ModulesNode from "@/components/fullnodecontent/ModulesNode";
import React from "react";
import Navbar from "@/components/Navbar";

export default function page() {
  return (
    <div>
      <>
        <Navbar />
        <div>
          {" "}
          {/* Sidebar Section */}
          <Sidebar />
          {/* Content Section */}
          <ModulesNode />
        </div>
      </>
    </div>
  );
}
