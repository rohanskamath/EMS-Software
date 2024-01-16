import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Button } from 'bootstrap';

const Employee = () => {
  const [dynamicData, setDynamicData] = useState([]);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/employee")
      .then(result => {
        if (result.data.status) {
          setDynamicData(result.data.data)
          setDisplay(true)
        }
      })
      .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/delete_employee/' + id)
      .then(result => {
        if (result.data.status) {
          window.location.reload();
          navigate("/dashboard/employee");
        } else {
          toast.success(result.data.Error, {
            theme: "dark",
            autoClose: 1000,
          });
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='d-flex justify-content-center mt-3'>
        <h3>Employee List</h3>
      </div>
      <hr className='bg-black  w-100' />
      <Link to="/dashboard/add_employee" className='btn btn-outline-success mt-2 ms-4'>Add Employee</Link>
      {
        display ? (
          <div className='m-4'>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Employee Image</th>
                    <th scope="col">Employee Email-ID</th>
                    <th scope="col">Employee Department</th>
                    <th scope="col">Employee Salary</th>
                    <th scope="col">Employee Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dynamicData.map((details, index) => (
                    <tr key={index}>
                      <th scope="row">{"EMP00" + details.emp_id}</th>
                      <td>{details.emp_name}</td>
                      <td><img src={`http://localhost:3000/Images/` + details.emp_img} alt="Employee Image" className='employee-image' /></td>
                      <td>{details.emp_email}</td>
                      <td>{details.category_name}</td>
                      <td>{details.emp_sal}</td>
                      <td>{details.emp_addr}</td>
                      <td>
                        <Link to={`/dashboard/edit_employee/` + details.emp_id} className='btn btn-outline-success btn-sm mx-1'><FaEdit /></Link>
                        <button className='btn btn-outline-danger btn-sm mx-1 mt-3' onClick={() => handleDelete(details.emp_id)}><FaTrashAlt /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='m-4'>No Records Found</div>
        )
      }

    </>
  )
}

export default Employee