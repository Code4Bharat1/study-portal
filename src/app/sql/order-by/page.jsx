import React from "react";
import Sidebar from "@/components/Sql/Sidebar";
import Navbar from "@/components/Navbar";
import EventsContent from "@/components/Sql/OrderBy";
export default function page() {
  return (
    <div>
      <Navbar />
      <div className="mt-30">
        {/* Sidebar Section */}

        <Sidebar />

        {/* Content Section */}

        <EventsContent />
      </div>
    </div>
  );
}
