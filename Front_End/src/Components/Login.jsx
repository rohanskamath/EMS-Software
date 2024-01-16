import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    //To store details in cookies
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    toast.success("Logging in... ", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 2000);


                } else {
                    toast.error(result.data.errorLogin, {
                        theme: "dark",
                        autoClose: 2000,
                    });
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <section className="vh-100 loginPage">
            <ToastContainer />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong border loginForm" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">
                                <h3 className="mb-5 text-center fs-1">SignIn/LogIn</h3>

                                <div className="form-outline mb-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" className="form-control form-control-md shadow-none" placeholder='Enter your email-id' onChange={(e) => setValues({ ...values, email: e.target.value })} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" className="form-control form-control-md shadow-none" placeholder='Enter your password' onChange={(e) => setValues({ ...values, password: e.target.value })} />
                                </div>
                                <button className="btn btn-success w-100" type="submit" onClick={handleSubmit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login