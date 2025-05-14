import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import PseudoCl from "@/components/CssFullContent/CssPseudoCl";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <PseudoCl />
    </div>
  );
}
