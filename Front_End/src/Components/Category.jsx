import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact';
import axios from 'axios';
import { useState } from 'react';

const Category = () => {

  const [dynamicData, setDynamicData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/category")
      .then(result => {
        if (result.data.status) {
          setDynamicData(result.data.data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const columns = [
    { label: 'Deparment ID', field: 'id', sort: 'asc', width: 150 },
    { label: 'Category Name', field: 'category_name', sort: 'asc', width: 270 },
  ];

  const rows = dynamicData.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const tableData = {
    columns,
    rows,
  };

  return (
    <>
      <div className='d-flex justify-content-center mt-3'>
        <h3>Category List</h3>
      </div>
      <hr className='bg-black  w-100' />
      <Link to="/dashboard/add_category" className='btn btn-outline-success mt-2 ms-4'>Add Category</Link>
      <div>
        <MDBDataTable striped bordered noBottomColumns={true} reponsiveSm={true} searching={false} className="m-5 custom-datatable" data={tableData} />
      </div>
    </>


  )
}

export default Category