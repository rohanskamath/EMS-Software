import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/adminlogin' element={<Login />}></Route>
          <Route path='/dashboard' element={<DashBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App