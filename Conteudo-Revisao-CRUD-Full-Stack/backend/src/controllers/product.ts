import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

// 🟩 Listar produtos
export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// 🟩 Criar produto
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao = "", preco = 0, quantidade_estoque = 0 } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    const data_cadastro = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url]
    );

    res.status(201).json({
      message: "Produto criado com sucesso!",
      produto_id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// 🟩 Buscar produto por ID
export const buscarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

// 🟩 Atualizar produto
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade_estoque } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE produtos
       SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, imagem_url = ?
       WHERE produto_id = ?`,
      [nome, descricao, preco, quantidade_estoque, imagem_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado para atualização" });
    }

    res.json({ message: "Produto atualizado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// 🟩 Excluir produto
export const excluirProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado para exclusão" });
    }

    res.json({ message: "Produto excluído com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
};
