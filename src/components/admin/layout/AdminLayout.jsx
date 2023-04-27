import React from 'react'
import { Outlet } from 'react-router'
import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'


export default function AdminLayout() {

  return (
    <>
      <AdminNavbar />
      <Sidebar />
      <div className='content ml-0 lg:ml-[250px] lg:pt-[4rem]'><Outlet /></div>
    </>
  )
}
