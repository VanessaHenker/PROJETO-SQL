const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({ 
  host: "localhost",
  user: "root",
  password: "", 
  database: "crud"
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE username = ? AND password = ?";
  const values = [
    req.body.email,
    req.body.password
  ];

  db.query(sql, values, (err, data) => { 
    if (err) return res.json({ error: "Error", details: err });
    if(data.length > 0){
      return res.json("Login Successfully")
    }
    else{
      return res.json("No Record")
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
