import React from "react";
import Sidebar from "@/components/Javascript/Sidebar";

import OperatorsContent from "@/components/Javascript/Operators";
export default function page() {
  return (
    <div>
      
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <OperatorsContent />
      </div>
    </div>
  );
}
