import React, { Profiler } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css"

import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />}></Route>

          <Route path='/dashboard' element={<DashBoard />}>

            <Route path='/dashboard/home' element={<Home />}></Route>
            <Route path='/dashboard/employee' element={<Employee />}></Route>
            <Route path='/dashboard/category' element={<Category />}></Route>
            <Route path='/dashboard/profile/:id' element={<Profile />}></Route>

            <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
            <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App