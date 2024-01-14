import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { useState } from 'react';

const Employee = () => {
  return (
    <>
      <div className='d-flex justify-content-center mt-3'>
        <h3>Employee List</h3>
      </div>
      <hr className='bg-black  w-100' />
      <Link to="/dashboard/add_employee" className='btn btn-outline-success mt-2 ms-4'>Add Employee</Link>
    </>
  )
}

export default Employee