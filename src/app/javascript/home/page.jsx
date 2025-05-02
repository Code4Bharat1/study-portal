import Sidebar from "@/components/Javascript/Sidebar";
import Home from "@/components/Javascript/Home";
import React from "react";
import Navbar from "@/components/Navbar";

function Page() {
  return (
    <>
      <Navbar />
      <div className="mt-25">
        {" "}
        {/* Sidebar Section */}
        <Sidebar />
        {/* Content Section */}
        <Home />
      </div>
    </>
  );
}

export default Page;
