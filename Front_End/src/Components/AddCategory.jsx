import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

const AddCategory = () => {

  const [newCategory, setNewCategory] = useState("");
  const naviagate = useNavigate();

  const handleCategory = (e) => {
    axios.post("http://localhost:3000/category/add_category", { category_name: newCategory })
      .then(result => {
        if (result.data.status) {
          toast.success(result.data.success, {
            theme: "dark",
            autoClose: 2000,
          });
          
          setTimeout(() => {
           naviagate("/dashboard/category")
          }, 3000);

        } else {
          toast.error(result.data.Error, {
            theme: "dark",
            autoClose: 2000,
          });
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <section className="vh-100">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong border shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">
                <h3 className="mb-5 text-center fs-1">Add Category</h3>

                <div className="form-outline mb-4">
                  <label htmlFor="category">New category</label>
                  <input type="category" name="category" autoComplete="off" className="form-control form-control-md shadow-none" placeholder='Enter your category' onChange={(e) => setNewCategory(e.target.value)} />
                </div>
                <button className="btn btn-success w-100" type="submit" onClick={handleCategory}>Add Category</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddCategory