import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import Ani from "@/components/CssFullContent/CssAnimation";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Ani />
    </div>
  );
}
