import { Router, Request, Response } from "express";
import upload from "../middleware/upload.js";
import fs from "fs";
import path from "path";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// ===============================
// 📌 UPLOAD DA IMAGEM
// ===============================
router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

// ===============================
// 🗑️ EXCLUIR A IMAGEM
// ===============================
// Exemplo de requisição DELETE:
// axios.delete("/upload", { data: { imagem_url: "/uploads/123.png" } })
router.delete("/", (req: Request, res: Response) => {
  try {
    const { imagem_url } = req.body;

    if (!imagem_url) {
      return res.status(400).json({ error: "imagem_url não enviada" });
    }

    // Pegamos só o nome do arquivo
    const filename = path.basename(imagem_url);
    const imgPath = path.join(UPLOADS_DIR, filename);

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
      console.log("🗑️ Imagem removida:", filename);
      return res.json({ sucesso: true, mensagem: "Imagem apagada com sucesso" });
    }

    res.json({ sucesso: false, mensagem: "Arquivo não encontrado (já removido)" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir a imagem" });
  }
});

export default router;
