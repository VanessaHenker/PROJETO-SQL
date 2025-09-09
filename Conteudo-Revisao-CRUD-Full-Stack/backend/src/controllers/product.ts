import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";

export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};
