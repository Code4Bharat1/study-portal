import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import Navbar from "@/components/Navbar";
import SQLHome from "@/components/Sql/Home.jsx";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <SQLHome />
    </div>
  );
}
