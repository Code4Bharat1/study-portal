import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import Combo from "@/components/CssFullContent/CssCombination";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Combo />
    </div>
  );
}
