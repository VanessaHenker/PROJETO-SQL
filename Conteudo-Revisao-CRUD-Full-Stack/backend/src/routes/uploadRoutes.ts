import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import pool from "../db.js"; 

const router = Router();

// 🗑️ Excluir produto e imagem
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // 1. Buscar o produto
    const [rows] = await pool.query("SELECT imagem_url FROM produtos WHERE produto_id = ?", [id]);
    const produto = rows[0];

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // 2. Excluir imagem da pasta
    if (produto.imagem_url) {
      const imagePath = path.join(process.cwd(), produto.imagem_url);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("⚠️ Erro ao excluir imagem:", err.message);
      });
    }

    // 3. Excluir o registro do banco
    await pool.query("DELETE FROM produtos WHERE produto_id = ?", [id]);

    res.json({ message: "Produto e imagem excluídos com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;
