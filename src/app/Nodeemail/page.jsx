import Navbar from '@/components/navbar'
import  Sidebar  from '@/components/fullnodecontent/nodesidebar';
import Email from '@/components/fullnodecontent/email'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Email/>
    </div>
  )
}
