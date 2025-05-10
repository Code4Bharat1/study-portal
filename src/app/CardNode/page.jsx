import React from "react";
import Card from "@/components/fullnodecontent/CardNode";
import Navbar from "@/components/Navbar";
export default function page() {
  return (
    <div>
      <Navbar />

      <div className="mt-25">
        <Card />
      </div>
    </div>
  );
}
