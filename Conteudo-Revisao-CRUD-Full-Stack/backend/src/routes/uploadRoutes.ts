import express from "express";
import multer from "multer";
import path from "path";
import { db } from "../database/conexaoSQL.js";

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota POST: criar produto com imagem
router.post("/", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, descricao = "", preco = 0, quantidade_estoque = 0 } = req.body;

    if (!nome) return res.status(400).json({ error: "O nome do produto é obrigatório" });

    const data_cadastro = new Date().toISOString().slice(0, 19).replace("T", " ");
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

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
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

export default router;
