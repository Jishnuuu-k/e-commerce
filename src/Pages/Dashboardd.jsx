import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Dashboard from '../Components/Admin/Dashboard/Dashboard';
function Dashboardd() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Dashboard sidebarWidth={sidebarWidth}/>
    </div>
  )
}
export default Dashboardd