import express from "express";
import pool from "../database/conexaoSQL.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Função para limpar imagens órfãs da pasta uploads
async function limparImagensOrfas() {
  try {
    const [rows]: any = await pool.query("SELECT imagem_url FROM produtos");
    const imagensBanco = rows.map((r: any) => path.basename(r.imagem_url || ""));

    const pastaUploads = path.join(process.cwd(), "uploads");
    const arquivos = fs.readdirSync(pastaUploads);

    for (const arquivo of arquivos) {
      if (!imagensBanco.includes(arquivo)) {
        fs.unlinkSync(path.join(pastaUploads, arquivo));
        console.log(`🗑️ Imagem órfã removida: ${arquivo}`);
      }
    }
  } catch (error) {
    console.error("Erro ao limpar imagens órfãs:", error);
  }
}

// Excluir produto + imagem associada
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o produto antes de excluir
    const [rows]: any = await pool.query("SELECT imagem_url FROM produtos WHERE produto_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const imagemPath = rows[0].imagem_url;

    // Excluir produto do banco
    await pool.query("DELETE FROM produtos WHERE produto_id = ?", [id]);

    // Excluir imagem associada (se existir)
    if (imagemPath) {
      const filePath = path.join(process.cwd(), imagemPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🧹 Imagem do produto removida: ${filePath}`);
      }
    }

    // Limpa imagens órfãs restantes
    await limparImagensOrfas();

    res.json({ message: "Produto e imagens relacionadas excluídas com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default router;
