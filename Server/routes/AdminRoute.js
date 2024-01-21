import express from 'express';
import con from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();
router.post('/adminlogin', (req, res) => {
  //   console.log(req.body);
  const sql = 'select *from tbladmin where email= ? and password=?';
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      return res.json({ loginStatus: false, Error: 'Query Error' });
    }
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: 'admin', email: email },
        'dsfffrdghtrfdgtrhghgfhgfhdgfewr455',
        { expiresIn: '1d' }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: 'Invalid credentials' });
    }
  });
});
router.post('/add-category', (req, res) => {
  const sql = 'INSERT INTO categories (`name`) VALUES (?)';

  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true });
  });
});

router.get('/category', (req, res) => {
  const sql = 'SELECT * FROM categories ';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/add_employee', (req, res) => {
  const sql =
    'INSERT INTO employee (`email`,`password`,`salary`,`address`,`name`,`image`,`categoryId`) VALUES (?)';
  bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    const values = [
      req.body.email,
      hashPassword,
      req.body.salary,
      req.body.address,
      req.body.name,
      req.body.image,
      req.body.categoryId,
    ];
    console.log(values);
    console.log(sql);
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Query Error' });
      return res.json({ Status: true, Result: result });
    });
  });
});
export { router as adminRouter };
