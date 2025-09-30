import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";

type Produto = {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: string;
  imagem_url: string | null;
};

// Listar produtos
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
    const produto = (rows as Produto[])[0] || null;

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

    const imagem_url = req.file ? `/uploads/${req.file.filename}` : req.body.imagem_url || null;
    const data_cadastro = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.execute(
      `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url]
    );

    const insertId = (result as any).insertId;
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [insertId]);
    res.status(201).json((rows as Produto[])[0]);
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

    // Só atualizar imagem se tiver novo arquivo
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const data_atualizacao = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Monta query dinamicamente
    const query = `
      UPDATE produtos
      SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, data_cadastro = ?
      ${imagem_url ? ", imagem_url = ?" : ""}
      WHERE produto_id = ?
    `;
    const params = imagem_url
      ? [nome, descricao, preco, quantidade_estoque, data_atualizacao, imagem_url, id]
      : [nome, descricao, preco, quantidade_estoque, data_atualizacao, id];

    await db.execute(query, params);

    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    res.json((rows as Produto[])[0]);
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
