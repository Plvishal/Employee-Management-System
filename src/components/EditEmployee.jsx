import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categor, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    categoryId: '',
    salary: '',
  });
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/category')
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get('http://localhost:3000/auth/employee/' + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          categoryId: result.data.Result[0].categoryId,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3000/auth/edit_employee/' + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate('/dashboard/employee');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border">
          <h3 className="text-center ">Edit Employee</h3>
          <form className="row g-1" onSubmit={handleEdit}>
            <div className="col-12">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="inputName"
                name="inputName"
                placeholder="Enter Name"
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
                value={employee.name}
              />
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control rounded-0"
                id="email"
                name="email"
                placeholder="Enter Email"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
                value={employee.email}
              />
            </div>
            {/* <div className="col-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control rounded-0"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
              />
            </div> */}
            <div className="col-12">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="salary"
                name="salary"
                placeholder="Enter Salary"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
                value={employee.salary}
              />
            </div>
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="address"
                name="address"
                placeholder="Enter Address"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
                value={employee.address}
              />
            </div>
            <div className="col-12">
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                className="form-select"
                onChange={(e) =>
                  setEmployee({ ...employee, categoryId: e.target.value })
                }
              >
                {categor.map((c) => {
                  return (
                    <option value={c.id} key={c.name}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* <div className="col-12">
              <label htmlFor="image" className="form-label">
                Select Image
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="image"
                name="image"
                onChange={(e) =>
                  setEmployee({ ...employee, image: e.target.files[0] })
                }
              />
            </div> */}
            <div className="col-12">
              <button className="btn btn-primary w-100"> Edit </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditEmployee;
