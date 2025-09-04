import { Request, Response } from "express";
import { db } from "../conexaoSQL.js";

export const getUsers = (_req: Request, res: Response) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err: any, data: any) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};
