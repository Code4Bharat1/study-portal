import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import Pseudoele from "@/components/CssFullContent/CssPseudoEle";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Pseudoele />
    </div>
  );
}
