import React, { useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Categoryview from '../Components/Admin/Categoryview/Categoryview';
function Categoryvieww() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Categoryview sidebarWidth={sidebarWidth}/>
    </div>
  )
}

export default Categoryvieww