import React, { useState } from 'react'
import AdminDashboard from '../Components/Admin/Admindashboard/Admindashboard'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
function AdminDashboardd() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <AdminDashboard sidebarWidth={sidebarWidth}/>
    </div>
  )
}
export default AdminDashboardd
