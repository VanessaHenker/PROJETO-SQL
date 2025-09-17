import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js"; // mantenha .js se usar ESM runtime

// ------------------------------
// Listar todos os produtos
// ------------------------------
export const listarProdutos = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

// ------------------------------
// Obter produto por ID
// ------------------------------
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

// ------------------------------
// Criar novo produto
// ------------------------------
export const criarProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco, quantidade_estoque, imagem_url } = req.body;

    if (!nome) return res.status(400).json({ error: "O nome do produto é obrigatório" });

    // Gerar data/hora local para MySQL DATETIME
    const agora = new Date();
    const data_cadastro = `${agora.getFullYear()}-${String(agora.getMonth()+1).padStart(2,'0')}-${String(agora.getDate()).padStart(2,'0')} ${String(agora.getHours()).padStart(2,'0')}:${String(agora.getMinutes()).padStart(2,'0')}:${String(agora.getSeconds()).padStart(2,'0')}`;

    const [result] = await db.execute(
      `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nome,
        descricao ?? "",
        preco ?? 0,
        quantidade_estoque ?? 0,
        data_cadastro,
        imagem_url ?? null
      ]
    );

    const insertId = (result as any).insertId;
    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [insertId]);
    res.status(201).json((rows as any[])[0]);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

// ------------------------------
// Atualizar produto existente
// ------------------------------
export const atualizarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const { nome, descricao, preco, quantidade_estoque, imagem_url } = req.body;

    const agora = new Date();
    const data_cadastro = `${agora.getFullYear()}-${String(agora.getMonth()+1).padStart(2,'0')}-${String(agora.getDate()).padStart(2,'0')} ${String(agora.getHours()).padStart(2,'0')}:${String(agora.getMinutes()).padStart(2,'0')}:${String(agora.getSeconds()).padStart(2,'0')}`;

    await db.execute(
      `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, data_cadastro = ?, imagem_url = ? WHERE produto_id = ?`,
      [
        nome ?? "",
        descricao ?? "",
        preco ?? 0,
        quantidade_estoque ?? 0,
        data_cadastro,
        imagem_url ?? null,
        id
      ]
    );

    const [rows] = await db.query("SELECT * FROM produtos WHERE produto_id = ?", [id]);
    const produtoAtualizado = (rows as any[])[0];

    if (!produtoAtualizado) return res.status(404).json({ error: "Produto não encontrado" });

    res.json(produtoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// ------------------------------
// Deletar produto
// ------------------------------
export const deletarProduto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    await db.execute("DELETE FROM produtos WHERE produto_id = ?", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
