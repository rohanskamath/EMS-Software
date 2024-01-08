import React, { Profiler } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/adminlogin' element={<Login />}></Route>

          <Route path='/dashboard' element={<DashBoard />}>

            <Route path='' element={<Home />}></Route>
            <Route path='/dashboard/employee' element={<Employee />}></Route>
            <Route path='/dashboard/category' element={<Category />}></Route>
            <Route path='/dashboard/profile' element={<Profile />}></Route>
            <Route path='/dashboard/add_category' element={<AddCategory />}></Route>

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App