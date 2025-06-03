import React from "react";
import { Routes, Route } from "react-router-dom";
import Homee from "./Pages/Homee";
import Regitrationn from "./Pages/Regitrationn";
import Loginn from "./Pages/Loginn";
import Myorderss from "./Pages/Myorderss";
import Profilee from "./Pages/Profilee";
import AdminDashboardd from "./Pages/Admindashboardd";
import AdminCategoryy from "./Pages/AdminCategoryy";
import Dashboardd from "./Pages/Dashboardd";
import Productvieww from "./Pages/Productvieww";
import Categoryvieww from "./Pages/Categoryvieww";
import Orderss from "./Pages/Orderss";
import Orderstatuss from "./Pages/Orderstatuss";
import Customerss from "./Pages/Customerss";
import Adminloginn from "./Pages/Adminloginn";
import Cartt from "./Pages/Cartt";
import AdminRoute from "./AdminRoute"; // Import AdminRoute
import Productss from "./Pages/Productss";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homee />} />
        <Route path="/register" element={<Regitrationn />} />
        <Route path="/login" element={<Loginn />} />
        <Route path="/products" element={<Productss />} />
        <Route path="/my-orders" element={<Myorderss />} />
        <Route path="/profile" element={<Profilee />} />
        <Route path="/cart" element={<Cartt />} />

        {/* Admin Login Route (Public) */}
        <Route path="/admin/login" element={<Adminloginn />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboardd />} />
          <Route path="/add-products" element={<AdminDashboardd />} />
          <Route path="/view-products" element={<Productvieww />} />
          <Route path="/add-category" element={<AdminCategoryy />} />
          <Route path="/view-category" element={<Categoryvieww />} />
          <Route path="/view-orders" element={<Orderss />} />
          <Route path="/view-order/status" element={<Orderstatuss />} />
          <Route path="/view/customers" element={<Customerss />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
