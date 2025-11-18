import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import fs from "fs/promises";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Interface representando um produto no banco
interface Produto extends RowDataPacket {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: Date;
  imagem_url: string | null;
}

// ==================== LISTAR PRODUTOS ====================
export const listarProdutos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<Produto[]>(
      "SELECT * FROM produtos ORDER BY produto_id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// ==================== OBTER PRODUTO ====================
export const obterProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao obter produto:", err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

// ==================== CRIAR PRODUTO ====================
export const criarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nome,
      descricao = "",
      preco = 0,
      quantidade_estoque = 0,
      imagem_url = null,
      data_cadastro,
    } = req.body;

    if (!nome) {
      res.status(400).json({ error: "O nome do produto é obrigatório" });
      return;
    }

    const dataFormatada = data_cadastro
      ? new Date(data_cadastro).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO produtos 
       (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, dataFormatada, imagem_url]
    );

    const insertId = result.insertId;

    const [novoProduto] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [insertId]
    );

    res.status(201).json(novoProduto[0]);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// ==================== ATUALIZAR PRODUTO ====================
export const atualizarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade_estoque, imagem_url } = req.body;

    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE produtos 
       SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, imagem_url = ?
       WHERE produto_id = ?`,
      [nome, descricao, preco, quantidade_estoque, imagem_url, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const [rows] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// ==================== DELETAR PRODUTO (com exclusão da imagem) ====================
export const deletarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1️⃣ Busca o produto para pegar a imagem
    const [rows] = await db.query<Produto[]>(
      "SELECT imagem_url FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const imagemUrl = rows[0].imagem_url;

    // 2️⃣ Deleta o produto do banco
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (imagemUrl) {
      const arquivo = path.join(UPLOADS_DIR, path.basename(imagemUrl));
      try {
        await fs.unlink(arquivo);
        console.log(`🗑 Arquivo removido: ${arquivo}`);
      } catch (err) {
        // Apenas log, não falha se o arquivo não existir
        console.warn(`⚠ Não foi possível remover arquivo ${arquivo}:`, (err as Error).message);
      }
    }

    res.json({ message: "Produto e imagem excluídos com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
