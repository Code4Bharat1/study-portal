import React from "react";
import Sidebar from "@/components/Javascript/Sidebar";
import Navbar from "@/components/Navbar";
import LoopsContent from "@/components/Javascript/Loops";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <LoopsContent />
      </div>
    </div>
  );
}
