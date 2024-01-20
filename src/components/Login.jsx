import { useState } from 'react';
import './style.css';
import axios from 'axios';
function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/auth/adminlogin', values)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2>Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <button className="btn btn-success w-100 rounded-0">Login</button>
            <div className="mb-3">
              <input type="checkbox" name="tick" id="tick" className="me-2" />
              <label htmlFor="tick">
                You are Agree with terms & conditions
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
