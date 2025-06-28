import mysql from "mysql";

import { db } from "../db.js";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "willdev123",
  database: "meubanco"
});

db.connect((err) => {
  if (err) {
    console.error("Erro na conexão:", err);
    return;
  }
  console.log("Conectado ao banco!");
});
