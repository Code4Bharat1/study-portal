import React from 'react'
import Sidebar from '@/components/fullnodecontent/nodesidebar';
import GetStartedPage from '@/components/fullnodecontent/GetStartedNode';
import Navbar from '@/components/Navbar';
export default function page() {
  return (
    <div>
        <Navbar/>
   <div className="mt-30">
    
      {/* Sidebar Section */}
    
      <Sidebar />


{/* Content Section */}

  <GetStartedPage />

   </div>


    </div>
  )
}
