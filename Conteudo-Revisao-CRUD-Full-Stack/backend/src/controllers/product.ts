import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js"; // mantenha .js se usar ESM runtime

export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

export const obterProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    res.json((rows as any[])[0] ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url } = req.body;
    const [result] = await db.execute(
      "INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url ?? null]
    );
    const insertId = (result as any).insertId;
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [insertId]);
    res.status(201).json((rows as any[])[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url } = req.body;
    await db.execute(
      "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, data_cadastro = ?, imagem_url = ? WHERE produto_id = ?",
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url ?? null, id]
    );
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    res.json((rows as any[])[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

export const deletarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.execute("DELETE FROM produtos WHERE produto_id = ?", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
