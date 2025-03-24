import React from 'react'
import { Routes, Route } from "react-router-dom"
import Homee from './Pages/Homee'
import Regitrationn from './Pages/Regitrationn'
import Loginn from './Pages/Loginn'
import Profilee from './Pages/Profilee'
import AdminDashboardd from './Pages/Admindashboardd'
import AdminCategoryy from './Pages/AdminCategoryy'
import Dashboardd from './Pages/Dashboardd'
import Productvieww from './Pages/Productvieww'
import Categoryvieww from './Pages/Categoryvieww'
import Orderss from './Pages/Orderss'
import Orderstatuss from './Pages/Orderstatuss'
import Customerss from './Pages/Customerss'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Homee/> } />
        <Route path="/register" element={ <Regitrationn/> } />
        <Route path="/login" element={ <Loginn/> } />
        <Route path="/profile" element={ <Profilee/> } />

        <Route path="/dashboard" element={ <Dashboardd/> } />
        <Route path="/add-products" element={ <AdminDashboardd/> } />
        <Route path="/view-products" element={ <Productvieww/> } />
        <Route path="/add-category" element={ <AdminCategoryy/> } />
        <Route path="/view-category" element={ <Categoryvieww/> } />
        <Route path="/view-orders" element={ <Orderss/> } />
        <Route path="/view-order/status" element={ <Orderstatuss/> } />
        <Route path="/view/customers" element={ <Customerss/> } />
      </Routes>
    </div>
  )
}

export default App