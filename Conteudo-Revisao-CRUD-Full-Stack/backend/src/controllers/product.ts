// src/controllers/product.ts
import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { extractFileName, deleteImage } from "../utils/deleteImage.js";


// Interface representando um produto no banco
interface Produto extends RowDataPacket {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: Date | string;
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

    if (!rows || rows.length === 0) {
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

    // Se o frontend enviar URL completa, extrair apenas o nome do arquivo
    const imagemFileName = extractFileName(imagem_url) ?? null;

    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO produtos 
       (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, dataFormatada, imagemFileName]
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

    // Buscar a imagem atual antes de atualizar (para possível remoção)
    const [rows] = await db.query<(RowDataPacket & { imagem_url: string | null })[]>(
      "SELECT imagem_url FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const imagemAntigaRaw = rows[0].imagem_url;
    const imagemAntiga = extractFileName(imagemAntigaRaw);

    // Garantir que no banco ficará apenas o nome do arquivo
    const novaImagemFileName = extractFileName(imagem_url) ?? null;

    // Atualiza o produto
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE produtos 
       SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, imagem_url = ?
       WHERE produto_id = ?`,
      [nome, descricao, preco, quantidade_estoque, novaImagemFileName, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    // Se a imagem antiga é diferente da nova, verificar se deve remover o arquivo antigo
    if (imagemAntiga && imagemAntiga !== novaImagemFileName) {
      const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(
        "SELECT COUNT(*) AS total FROM produtos WHERE imagem_url = ?",
        [imagemAntiga]
      );

      const total = countRows?.[0]?.total ?? 0;
      if (total === 0) {
        await deleteImage(imagemAntiga);
      }
    }

    // Buscar e retornar produto atualizado
    const [updatedRows] = await db.query<Produto[]>(
      "SELECT * FROM produtos WHERE produto_id = ?",
      [id]
    );

    res.json(updatedRows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

// ==================== DELETAR PRODUTO ====================
export const deletarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // 1) Buscar o produto para pegar o nome da imagem antes de excluir
    const [rows] = await db.query<(RowDataPacket & { imagem_url: string | null })[]>(
      "SELECT imagem_url FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (!rows || rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const imagemRaw = rows[0].imagem_url;
    const fileName = extractFileName(imagemRaw);

    // 2) Deletar produto do DB
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Erro ao excluir produto" });
      return;
    }

    // 3) Verificar se ainda existe outro produto usando a mesma imagem
    if (fileName) {
      const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(
        "SELECT COUNT(*) AS total FROM produtos WHERE imagem_url = ?",
        [fileName]
      );

      const total = countRows?.[0]?.total ?? 0;
      if (total === 0) {
        await deleteImage(fileName);
      }
    }

    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
