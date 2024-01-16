import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams();
  const [adminProfile, setAdminProfile] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    axios.get("http://localhost:3000/profile/" + id)
      .then(result => {
        setAdminProfile({
          email: result.data.data[0].email,
          password: result.data.data[0].password
        })
      })
      .catch(err => console.log(err))
  })
  return (
    <>
      <section className="vh-100">
        <div className="container py-3 py-md-5">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-2-strong border shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-3 p-md-5">
                <h3 className="mb-4 text-center fs-2">Admin Profile</h3>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Employee Name</label>
                  <input type="text" name="name" autoComplete="off" className="form-control form-control-sm shadow-none" placeholder="Enter employee name" disabled value={adminProfile.email}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name="password" autoComplete="off" className="form-control form-control-sm shadow-none" placeholder="Enter default password" disabled value={adminProfile.password}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Profile