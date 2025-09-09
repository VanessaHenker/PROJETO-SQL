import { Router } from "express";
import { db } from "../database/conexaoSQL";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

export default router;
