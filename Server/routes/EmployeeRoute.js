import express from 'express';
import con from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const employeeRouter = express.Router();
employeeRouter.post('/employeeLogin', (req, res) => {
  // console.log(req.body);
  const sql = 'select * from employee where email= ? ';
  con.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: 'Query Error' });
    }
    // console.log(result);
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        console.log(response);
        if (err)
          return res.json({ loginStatus: false, Error: 'Wrong Password' });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: 'employee', email: email },
            'dsfffrdghtrfdgtrhghgfhgfhdgfewr455',
            { expiresIn: '1d' }
          );
          console.log(token);
          res.cookie('token', token);
          return res.json({ loginStatus: true,id:result[0].id });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: 'Invalid credentials' });
    }
  });
});

export { employeeRouter };
