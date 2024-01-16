import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [salaryTotal, setTotalSalary] = useState(0)

  useEffect(() => {
    employeeCount();
    SalaryCount();
  }, [])

  const employeeCount = () => {
    axios.get("http://localhost:3000/employee_count")
      .then(result => {
        if (result.data.status) {
          setEmployeeTotal(result.data.data[0].employee)
        } else {
          setEmployeeTotal(0)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const SalaryCount = () => {
    axios.get("http://localhost:3000/salary_count")
      .then(result => {
        if (result.data.status) {
          setTotalSalary(result.data.data[0].salaries)
        } else {
          setTotalSalary(0)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className='p-3 d-flex justify-content-around  mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className="text-center pb-1">
            <h4>Total Employees</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className="text-center pb-1">
            <h4>Total Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{salaryTotal}</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home