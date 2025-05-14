import Navbar from "@/components/Navbar";
import Sidebar from "@/components/fullnodecontent/nodesidebar";
import React from "react";
import Event from "@/components/fullnodecontent/events";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Event />
    </div>
  );
}
