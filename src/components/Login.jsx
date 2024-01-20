import './style.css';
function Login() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2>Login Form</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="form-control rounded-0"
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
