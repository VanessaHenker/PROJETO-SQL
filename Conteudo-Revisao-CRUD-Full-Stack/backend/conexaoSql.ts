import mysql from "mysql"

export const conexaoSql = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "MeuBanco2"
})