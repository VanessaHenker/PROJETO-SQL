import { Router, Request, Response } from "express";
import upload from "../middleware/upload.js"; // .js obrigatório no Node ESM

const router = Router();

router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  // Retorna a URL relativa que será salva no banco
  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

export default router;
