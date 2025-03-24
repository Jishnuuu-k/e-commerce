import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Productview from '../Components/Admin/ProductView/Productview';
function Productvieww() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Productview sidebarWidth={sidebarWidth}/>
    </div>
  )
}
export default Productvieww