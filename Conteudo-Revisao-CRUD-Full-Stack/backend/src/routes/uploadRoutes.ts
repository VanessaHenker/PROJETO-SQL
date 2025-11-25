import { Router, Request, Response } from "express";
import upload from "../middleware/upload.js"; // <- precisa .js mesmo sendo .ts

const router = Router();

router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
    }

    const imagemUrl = `/uploads/${req.file.filename}`;

    return res.json({
      mensagem: "Upload realizado com sucesso!",
      imagem_url: imagemUrl,
      nome_arquivo: req.file.filename
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return res.status(500).json({ error: "Erro ao fazer upload da imagem." });
  }
});

export default router;
