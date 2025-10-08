import { Router, Request, Response } from "express";
import path from "path";
import fs from "fs";
import db from "../database/conexaoSQL.js";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

// exemplo de DELETE se quiser testar exclusão de imagem
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows]: any = await db.query("SELECT imagem_url FROM produtos WHERE produto_id = ?", [id]);
    const produto = rows[0];

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    if (produto.imagem_url) {
      const imagePath = path.join(process.cwd(), produto.imagem_url);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("⚠️ Erro ao excluir imagem:", err.message);
      });
    }

    await db.query("DELETE FROM produtos WHERE produto_id = ?", [id]);

    res.json({ message: "Produto e imagem excluídos com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir produto:", err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;
