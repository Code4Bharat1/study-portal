import Navbar from '@/components/navbar'
import  Sidebar  from '@/components/fullnodecontent/nodesidebar';
import React from 'react'
import File from '@/components/fullnodecontent/fsnode';
export default function page() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <File/>
    </div>
  )
}
