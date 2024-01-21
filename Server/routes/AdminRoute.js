import express from 'express';
import con from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

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

// Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post('/add_employee', upload.single('image'), (req, res) => {
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
      req.file.filename,
      req.body.categoryId,
    ];

    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Query Error' });
      return res.json({ Status: true, Result: result });
    });
  });
});

router.get('/employee', (req, res) => {
  const sql = 'SELECT * FROM employee ';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/employee/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM employee WHERE id= ?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.put('/edit_employee/:id', (req, res) => {
  const { id } = req.params;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.categoryId,
  ];

  const sql = `UPDATE employee 
  set name=?, email=?,salary=?, address=?, categoryId=? 
  where id=?`;
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_employee/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'delete from employee where id =?';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/adminCount', (req, res) => {
  const sql = 'select count(id)  as tbladmin from tbladmin';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });

    return res.json({ Status: true, Result: result });
  });
});
router.get('/employeeCount', (req, res) => {
  const sql = 'select count(id)  as employee from employee';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });

    return res.json({ Status: true, Result: result });
  });
});
router.get('/salary', (req, res) => {
  const sql = 'select sum(salary)  as employee from employee';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: 'Query Error' });

    return res.json({ Status: true, Result: result });
  });
});
export { router as adminRouter };
