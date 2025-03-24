import React, { useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Customers from '../Components/Admin/Customers/Customers';
function Customerss() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Customers sidebarWidth={sidebarWidth}/>
    </div>
  )
}

export default Customerss