import mysql from 'mysql';
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employees',
});
con.connect(function (err) {
  if (err) {
    console.log('connection error');
  } else {
    console.log('Connected wit DB');
  }
});

export default con;
