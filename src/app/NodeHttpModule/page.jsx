import Sidebar from '@/components/fullnodecontent/nodesidebar';
import NodeHttpModule from '@/components/fullnodecontent/HttpModule';
import React from 'react';
import Navbar from '@/components/Navbar';

function Page() {
  return (
    <>
      <Navbar />
        <div>  {/* Sidebar Section */}
        
        <Sidebar />

      {/* Content Section */}
        <NodeHttpModule/></div>
       
    
    </>
  );
}

export default Page;
