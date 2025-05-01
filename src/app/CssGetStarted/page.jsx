import React from 'react'
import  Sidebar from '@/components/CssFullContent/cssSidebar'
import Navbar from '@/components/navbar'
import Home from '@/components/CssFullContent/'
export default function page() {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
      <Home/>
    </div>
  )
}
