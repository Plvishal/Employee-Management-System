import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/auth/add-category', { category })
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/category');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-75 ">
      <div className="p-3 rounded w-25 border ">
        <h2>Add Category</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Enter Category"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100 rounded-0">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
