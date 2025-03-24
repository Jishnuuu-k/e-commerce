import React, { useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Orderstatus from '../Components/Admin/Orderstatus/Orderstatus';
function Orderstatuss() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Orderstatus sidebarWidth={sidebarWidth}/>
    </div>
  )
}
export default Orderstatuss