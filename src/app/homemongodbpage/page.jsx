// import Mongodbhome from '@/components/Mongodbpage/Mongodbhome'
// import MongoDBSidebar from '@/components/Mongodbpage/MongoDBSidebar'
// import Navbar from '@/components/Navbar/Navbar'

import Mongodbhome from "@/components/Mongodbpage/Mongodbhome";
import MongoDBSidebar from "@/components/Mongodbpage/MongoDBSidebar";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />

      <MongoDBSidebar />
      <Mongodbhome />
    </>
  );
};

export default page;
