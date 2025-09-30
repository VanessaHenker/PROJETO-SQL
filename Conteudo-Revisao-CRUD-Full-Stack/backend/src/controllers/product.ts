import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";

// Listar todos os produtos
export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// Obter produto por ID
export const obterProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    const produto = (rows as any[])[0] ?? null;

    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });

    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

// Criar produto
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao = "", preco = 0, quantidade_estoque = 0 } = req.body;

    if (!nome) return res.status(400).json({ error: "O nome do produto é obrigatório" });

    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;
    const data_cadastro = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.execute(
      `INSERT INTO produtos 
       (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url]
    );

    const insertId = (result as any).insertId;
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [insertId]);

    res.status(201).json((rows as any[])[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// Atualizar produto
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { nome, descricao = "", preco = 0, quantidade_estoque = 0 } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;
    const data_cadastro = new Date().toISOString().slice(0, 19).replace("T", " ");

    await db.execute(
      `UPDATE produtos 
       SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, data_cadastro = ?, imagem_url = ? 
       WHERE produto_id = ?`,
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url, id]
    );

    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    res.json((rows as any[])[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// Deletar produto
export const deletarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await db.execute("DELETE FROM produtos WHERE produto_id = ?", [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
