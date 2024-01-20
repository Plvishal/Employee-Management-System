import express from 'express';
import con from '../config/db.js';
import jwt from 'jsonwebtoken';

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

export { router as adminRouter };
