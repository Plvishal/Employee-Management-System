// import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/employee/details/' + id)
      .then((result) => {
        console.log(result);
        setEmployee(result.data[0]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout').then((result) => {
      if (result.data.Status) {
        navigate('/');
      } else {
        alert(result.data.Error);
      }
    });
  };
  return (
    <>
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Emoployee Management System</h4>
      </div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`../Server/public/images/` + employee.image}
          className="emp_det_image"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: ${employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;
