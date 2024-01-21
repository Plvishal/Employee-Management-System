import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Employee() {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/employee')
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Employee List</h3>
        </div>
        <Link to="/dashboard/add_employee" className="btn btn-success">
          Add Employee
        </Link>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={'../Server/public/images/' + e.image}
                      alt="error"
                      className="employee_img"
                    />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}</td>
                  <td>
                    <Link
                      className="btn btn-info btn-sm me-2"
                      to={`/dashboard/edit_employee/` + e.id}
                    >
                      Edit
                    </Link>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Employee;
