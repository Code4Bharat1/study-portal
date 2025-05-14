import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import BoxModel from "@/components/CssFullContent/CssBoxModel";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <BoxModel />
    </div>
  );
}
