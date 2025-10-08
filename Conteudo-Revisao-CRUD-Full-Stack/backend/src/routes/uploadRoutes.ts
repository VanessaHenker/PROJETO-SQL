import express from "express";
import path from "path";
import fs from "fs";
import pool from "../database/conexaoSQL.js";

const router = express.Router();

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Busca o produto antes de deletar
    const [rows]: any = await pool.query("SELECT imagem_url FROM produtos WHERE produto_id = ?", [id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const imagemPath = rows[0].imagem_url
      ? path.join(process.cwd(), rows[0].imagem_url)
      : null;

    // Deleta do banco
    await pool.query("DELETE FROM produtos WHERE produto_id = ?", [id]);

    // Deleta a imagem se existir
    if (imagemPath && fs.existsSync(imagemPath)) {
      fs.unlinkSync(imagemPath);
      console.log("🗑️ Imagem excluída:", imagemPath);
    }

    res.json({ message: "Produto e imagem excluídos com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto" });
  }
});

export default router;
