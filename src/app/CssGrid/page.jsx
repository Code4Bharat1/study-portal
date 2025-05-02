import React from 'react'
import  Sidebar from '@/components/CssFullContent/cssSidebar'
import Navbar from '@/components/navbar'
import Grid from '@/components/CssFullContent/CssGrid'
export default function page() {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
      <Grid/>
    </div>
  )
}
