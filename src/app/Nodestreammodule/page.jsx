import Navbar from '@/components/navbar'
import  Sidebar  from '@/components/fullnodecontent/nodesidebar';
import React from 'react'
import Stream from "@/components/fullnodecontent/Streamnode"
export default function page() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Stream/>

    </div>
  )
}
