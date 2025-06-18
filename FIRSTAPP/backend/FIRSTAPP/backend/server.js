const express = requeri('express');
const mysql = require('msql')
const cors = require('cors')

const app = express()

app.use(cors())
const db = mysql.createConection({
  host: "localhost"
  user: "root"
  password: "";
  database: "crud"
})

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE username = ? AND passowrd = ?"
  const values = [
    req.body.email
    req.body.password
  ]
  db.query(sql, [value], err, data) => {
    if(err return res.json("Login Failed"))
      return res.json(data);
  }

})