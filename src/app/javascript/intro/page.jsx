import Sidebar from "@/components/Javascript/Sidebar";
import Intro from "@/components/Javascript/Intro";
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
        <Intro />
      </div>
    </>
  );
}

export default Page;
