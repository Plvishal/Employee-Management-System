import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Category() {
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

  return (
    <>
      <div className="px-5 mt-3">
        <div className="d-flex justify-content-center">
          <h3>Category List</h3>
        </div>
        <Link to="/dashboard/add_category" className="btn btn-success">
          Add Category
        </Link>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categor.map((c) => (
                <tr key={c.id}>
                  <th>{c.id}</th>
                  <td>{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Category;
