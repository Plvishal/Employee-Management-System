import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:3000/verify')
      .then((result) => {
        console.log(result);
        if (result.data.role === 'admin') {
          navigate('/dashboard');
        } else if (result.data.role === 'employee') {
          navigate('/employee_details/' + result.data.id);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleEmployee = () => {
    navigate('/employeeLogin');
  };
  const handleAdmin = () => {
    navigate('/adminLogin');
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <h2 className="text-center">Login As</h2>
          <div className="d-flex justify-content-between mt-5 mb-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEmployee}
            >
              Employee
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAdmin}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
