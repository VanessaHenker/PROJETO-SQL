import mysql from "mysql";
import { Request, Response } from "express";

// Conexão com o banco
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "MeuBanco2"
});

// Função para pegar usuários
export const getUsers = (req: Request, res: Response) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};
