import React, { useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Orders from '../Components/Admin/Orders/Orders';
function Orderss() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Orders sidebarWidth={sidebarWidth}/>
    </div>
  )
}

export default Orderss