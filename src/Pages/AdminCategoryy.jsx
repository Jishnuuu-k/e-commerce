import React, { useState } from 'react'
import Sidebar from '../Components/Admin/Sidebar/Sidebar'
import Admincategory from '../Components/Admin/Admincategory/Admincategory';

function AdminCategoryy() {
  const [sidebarWidth, setSidebarWidth] = useState(250);
    return (
    <div>
        <Sidebar onToggle={setSidebarWidth}/>
        <Admincategory sidebarWidth={sidebarWidth}/>
    </div>
  )
}

export default AdminCategoryy