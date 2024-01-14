import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css"

const DashBoard = () => {
  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap min-vh-100'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark overflow-y-auto' style={{height: "1524px" }}>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to="/dashboard" className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'><span className='fs-5 fw-bold d-none d-sm-inline'>Employee Tracker</span></Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id="menu">
              <li className='w-100'>
                <Link to="/dashboard" className='nav-link text-white px-0 align-middle'>
                  <i className='fs-4 bi-speedometer2'></i><span className='ms-2 d-none d-sm-inline'>Dashboard</span></Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/employee" className='nav-link text-white px-0 align-middle'>
                  <i className='fs-4 bi-people'></i><span className='ms-2 d-none d-sm-inline'>Manage Employees</span></Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/category" className='nav-link text-white px-0 align-middle'>
                  <i className='fs-4 bi-columns'></i><span className='ms-2 d-none d-sm-inline'>Department</span></Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/profile" className='nav-link text-white px-0 align-middle'>
                  <i className='fs-4 bi-person'></i><span className='ms-2 d-none d-sm-inline'>Profile</span></Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/logout" className='nav-link text-white px-0 align-middle'>
                  <i className='fs-4 bi-power'></i><span className='ms-2 d-none d-sm-inline'>Logout</span></Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
          <div className='p-3 d-flex justify-content-center shadow'><h4>Employee Tracker System</h4></div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashBoard