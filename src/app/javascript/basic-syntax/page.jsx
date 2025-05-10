import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Javascript/Sidebar";
import ControlFlowContent from "@/components/Javascript/ControlFlow";

export default function JavascriptControlFlowPage() {
  return (
    <>
      <Navbar />
      <div className="flex mt-24 px-4 gap-6">
        <Sidebar />
        <main className="flex-1">
          <ControlFlowContent />
        </main>
      </div>
    </>
  );
}
