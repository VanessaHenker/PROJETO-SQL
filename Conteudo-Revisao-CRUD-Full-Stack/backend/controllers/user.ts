import { Request, Response } from "express";
import { db } from "../conexaoSql";

export const getUsers = (req: Request, res: Response): void => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
};
