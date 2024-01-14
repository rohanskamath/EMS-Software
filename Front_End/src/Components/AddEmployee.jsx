import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AddEmployee = () => {

    const [departments, setDepartments] = useState([]);
    const [employeeValues, setEmployeeValues] = useState({
        emp_name: "",
        emp_email: "",
        emp_pass: "",
        emp_sal: 0,
        emp_dept: "",
        emp_addr: "",
        emp_image: ""
    })

    useEffect(() => {
        axios.get("http://localhost:3000/category")
            .then(result => {
                if (result.data.status) {
                    console.log(result.data.data)
                    setDepartments(result.data.data)
                }
            })
            .catch(err => console.log(err))
    }, []);

    const handleSubmitData = (e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append("emp_name",employeeValues.emp_name);
        formData.append("emp_email",employeeValues.emp_email);
        formData.append("emp_pass",employeeValues.emp_pass);
        formData.append("emp_sal",employeeValues.emp_sal);
        formData.append("emp_dept",employeeValues.emp_dept);
        formData.append("emp_addr",employeeValues.emp_addr);
        formData.append("emp_image",employeeValues.emp_image);

        axios.post("http://localhost:3000/employee/add_employee", formData)
            .then(result => {
                toast.success(result.data.success, {
                    theme: "dark",
                    autoClose: 1000,
                });
                setTimeout(() => {
                    window.location.reload()
                   }, 2000);
            })
            .catch((err) => {
                toast.error(result.data.Error, {
                    theme: "dark",
                    autoClose: 2000,
                });
            })
    }

    return (
        <section className="vh-100">
            <ToastContainer />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-2-strong border shadow" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">
                                <h3 className="mb-5 text-center fs-1">Add Employee</h3>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-outline mb-4">
                                            <label htmlFor="name">Employee Name</label>
                                            <input type="text" name="name" autoComplete="off" className="form-control form-control-md shadow-none" placeholder='Enter employee name'
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_name: e.target.value }) }} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="email">Employee Email-ID</label>
                                            <input type="email" name="email" autoComplete="off" className="form-control form-control-md shadow-none" placeholder='Enter employee email-id'
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_email: e.target.value }) }} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="salary">Salary (LPA)</label>
                                            <input type="number" name="salary" autoComplete="off" className="form-control form-control-md shadow-none" placeholder='Enter employee salalry'
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_sal: e.target.value }) }} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="department">Belongs to Department</label>
                                            <select name="department" className="form-control form-control-md shadow-none"
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_dept: e.target.value }) }}>
                                                <option value="">---- Select ----</option>
                                                {departments.map((opt, index) => {
                                                    return <option key={index} value={opt.id}>{opt.category_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-outline mb-4">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" autoComplete="off" className="form-control form-control-md shadow-none" placeholder='Enter default password'
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_pass: e.target.value }) }} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="image">Select Image</label>
                                            <input type="file" name="emp_image" autoComplete="off" className="form-control form-control-md shadow-none"
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_image: e.target.files[0] }) }} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label htmlFor="address">Employee Address</label>
                                            <textarea name="address" autoComplete="off" rows="5" cols="7" className="form-control form-control-md shadow-none mw-100 " placeholder='Enter employee address'
                                                onChange={(e) => { setEmployeeValues({ ...employeeValues, emp_addr: e.target.value }) }}></textarea>
                                        </div>

                                    </div>
                                </div>

                                <button className="btn btn-success w-100" type="submit" onClick={handleSubmitData}>Add Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AddEmployee