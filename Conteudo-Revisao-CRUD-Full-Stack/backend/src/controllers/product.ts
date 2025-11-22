import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import fs from "fs";
import path from "path";

// Interface do produto
interface Produto extends RowDataPacket {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: Date;
  imagem_url: string | null;
}

// Diretório de uploads
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export const deletarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1️⃣ Buscar produto antes de deletar
    const [rows] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const produto = rows[0];

    // 2️⃣ Deletar produto do banco
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    // 3️⃣ Remover imagem do uploads, se existir
    if (produto.imagem_url) {
      const nomeArquivo = produto.imagem_url.replace("http://localhost:3001/uploads/", "");
      const caminhoImagem = path.join(UPLOADS_DIR, nomeArquivo);

      if (fs.existsSync(caminhoImagem)) {
        try {
          fs.unlinkSync(caminhoImagem);
          console.log(`🗑️ Imagem excluída: ${nomeArquivo}`);
        } catch (err) {
          console.error(`Erro ao excluir imagem ${nomeArquivo}:`, err);
        }
      }
    }

    res.json({ message: "Produto e imagem excluídos com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
