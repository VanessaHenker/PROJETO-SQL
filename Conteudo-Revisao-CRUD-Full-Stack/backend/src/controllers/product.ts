import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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
    const [rows] = await db.query<Produto[]>("SELECT * FROM produtos ORDER BY produto_id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// ==================== OBTER PRODUTO ====================
export const obterProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows] = await db.query<Produto[]>("SELECT * FROM produtos WHERE produto_id = ?", [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// ==================== ATUALIZAR PRODUTO ====================
export const atualizarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade_estoque, imagem_url } = req.body;

    // Atualiza o produto
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

    // Busca o produto atualizado
    const [rows] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    res.json(rows[0]); // ✅ retorna o produto completo
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// ==================== DELETAR PRODUTO ====================
export const deletarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};