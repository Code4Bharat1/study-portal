import Navbar from '@/components/navbar'
import  Sidebar  from '@/components/fullnodecontent/nodesidebar';
import React from 'react'
import  Upload  from  '@/components/fullnodecontent/uploadnode'
export default function page() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Upload/>
    </div>
  )
}
