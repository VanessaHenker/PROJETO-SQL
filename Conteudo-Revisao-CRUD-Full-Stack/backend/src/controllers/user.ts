import { Request, Response } from "express";
import { db } from '../database/conexaoSQL.js';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
