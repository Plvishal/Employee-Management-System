import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    categoryId: '',
    image: '',
    salary: '',
  });
  const [categor, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/category')
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('categoryId', employee.categoryId);
    axios
      .post('http://localhost:3000/auth/add_employee', formData)
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
          <h3 className="text-center ">Add Employee</h3>
          <form className="row g-1" onSubmit={handleSubmit}>
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
              />
            </div>
            <div className="col-12">
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
            </div>
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
            <div className="col-12">
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
            </div>
            <div className="col-12">
              <button className="btn btn-primary w-100"> Add </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
