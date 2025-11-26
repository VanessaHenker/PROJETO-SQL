// src/controllers/product.ts
import { Request, Response } from "express";
import { db } from "../database/conexaoSQL.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { extractFileName, deleteImage } from "../utils/deleteImage.js";

// Interface do produto no banco
interface Produto extends RowDataPacket {
  produto_id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade_estoque: number;
  data_cadastro: Date | string;
  imagem_url: string | null;
}

/* ==================== LISTAR PRODUTOS ==================== */
export const listarProdutos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<Produto[]>("SELECT * FROM produtos ORDER BY produto_id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

/* ==================== OBTER PRODUTO ==================== */
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

/* ==================== CRIAR PRODUTO ==================== */
export const criarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, descricao = "", preco = 0, quantidade_estoque = 0, imagem_url } = req.body;

    if (!nome) {
      res.status(400).json({ error: "O nome do produto é obrigatório" });
      return;
    }

    // Data formatada
    const dataFormatada = new Date().toISOString().slice(0, 19).replace("T", " ");

    // ------------------ DEFINIR URL FINAL DA IMAGEM ------------------
    let imagemFinal: string | null = null;

    // Se veio arquivo novo pelo upload
    if (req.file) {
      imagemFinal = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    else if (imagem_url) {
      // se veio string, garante URL completa
      const fileName = extractFileName(imagem_url);
      imagemFinal = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    }

    // Inserir no banco
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, data_cadastro, imagem_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, descricao, preco, quantidade_estoque, dataFormatada, imagemFinal]
    );

    const insertId = result.insertId;

    // Buscar o novo produto
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

/* ==================== ATUALIZAR PRODUTO ==================== */
export const atualizarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade_estoque, imagem_url } = req.body;

    // Buscar imagem atual
    const [rows] = await db.query<(RowDataPacket & { imagem_url: string | null })[]>(
      "SELECT imagem_url FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const imagemAntigaUrl = rows[0].imagem_url;
    const imagemAntigaFile = extractFileName(imagemAntigaUrl);

    // ------------------ DEFINIR NOVA URL DA IMAGEM ------------------
    let novaImagemFinal: string | null = imagemAntigaUrl;

    if (req.file) {
      // nova imagem enviada
      novaImagemFinal = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    else if (imagem_url) {
      // manteve a imagem antiga, mas garante URL correta
      const fileName = extractFileName(imagem_url);
      novaImagemFinal = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    }

    // Atualizar produto
    const [result] = await db.execute<ResultSetHeader>(
      `UPDATE produtos 
       SET nome=?, descricao=?, preco=?, quantidade_estoque=?, imagem_url=?
       WHERE produto_id=?`,
      [nome, descricao, preco, quantidade_estoque, novaImagemFinal, id]
    );

    // Remover imagem antiga se não for mais usada
    if (imagemAntigaFile && novaImagemFinal?.includes(imagemAntigaFile) === false) {

      const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(
        "SELECT COUNT(*) AS total FROM produtos WHERE imagem_url LIKE ?",
        [`%${imagemAntigaFile}`]
      );

      if ((countRows?.[0]?.total ?? 0) === 0) {
        await deleteImage(imagemAntigaFile);
      }
    }

    // retornar atualizado
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

/* ==================== DELETAR PRODUTO ==================== */
export const deletarProduto = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // buscar imagem
    const [rows] = await db.query<(RowDataPacket & { imagem_url: string | null })[]>(
      "SELECT imagem_url FROM produtos WHERE produto_id = ?",
      [id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Produto não encontrado" });
      return;
    }

    const imagemRaw = rows[0].imagem_url;
    const fileName = extractFileName(imagemRaw);

    // deletar produto
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM produtos WHERE produto_id = ?",
      [id]
    );

    // remover imagem se não usada de novo
    if (fileName) {
      const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(
        "SELECT COUNT(*) AS total FROM produtos WHERE imagem_url LIKE ?",
        [`%${fileName}`]
      );

      if ((countRows?.[0]?.total ?? 0) === 0) {
        await deleteImage(fileName);
      }
    }

    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
