import React from 'react'
import  Sidebar from '@/components/CssFullContent/cssSidebar'
import Navbar from '@/components/navbar'
import Responsive from '@/components/CssFullContent/CssResponsive'
export default function page() {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
      <Responsive/>
    </div>
  )
}
