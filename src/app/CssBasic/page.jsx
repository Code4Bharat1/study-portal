import React from 'react'
import  Sidebar from '@/components/CssFullContent/cssSidebar'
import Navbar from '@/components/navbar'
import Basic from '@/components/CssFullContent/CssBasic'
export default function page() {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
      <Basic/>
    </div>
  )
}
