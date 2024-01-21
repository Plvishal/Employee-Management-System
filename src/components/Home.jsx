import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/adminCount')
      .then((res) => {
        setAdminCount(res.data.Result[0].tbladmin);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://localhost:3000/auth/employeeCount')
      .then((res) => {
        setEmployeeCount(res.data.Result[0].employee);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:3000/auth/salary')
      .then((res) => {
        setSalary(res.data.Result[0].employee);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://localhost:3000/auth/adminRecords')
      .then((res) => {
        setAdmins(res.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <div className="p-3 d-flex justify-content-around mt-3">
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
            <div className="text-center pb-1">
              <h4>Admin</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5> {adminCount}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
            <div className="text-center pb-1">
              <h4>Employee</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5> {employeeCount}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
            <div className="text-center pb-1">
              <h4>Salary</h4>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5> &#8377;{salary}</h5>
            </div>
          </div>
        </div>

        {/* List of admin  */}
        <div className="mt-4 px-5 pt-3">
          <h3>List of Admins</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                    <Link className="btn btn-info btn-sm me-2">Edit</Link>
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

export default Home;
