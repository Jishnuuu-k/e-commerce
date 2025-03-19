import React from 'react'
import { Routes, Route } from "react-router-dom"
import Homee from './Pages/Homee'
import Regitrationn from './Pages/Regitrationn'
import Loginn from './Pages/Loginn'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Homee/> } />
        <Route path="register" element={ <Regitrationn/> } />
        <Route path="login" element={ <Loginn/> } />
      </Routes>
    </div>
  )
}

export default App