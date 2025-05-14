import React from "react";
import Sidebar from "@/components/CssFullContent/cssSidebar";
import Navbar from "@/components/Navbar";
import Flex from "@/components/CssFullContent/CssFlex";
export default function page() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Flex />
    </div>
  );
}
