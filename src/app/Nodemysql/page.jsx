import Navbar from '@/components/navbar'
import  Sidebar  from '@/components/fullnodecontent/nodesidebar';
import React from 'react'
import Sql from '@/components/fullnodecontent/mysqlnode'
export default function page() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Sql/>
    </div>
  )
}
