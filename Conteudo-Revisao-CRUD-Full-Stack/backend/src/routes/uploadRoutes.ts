import { Router, Request, Response } from "express";
import upload from "../middleware/upload.js";
import { cleanupUploads } from "../utils/cleanupUploads.js";

const router = Router();

router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }

  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

// Rota para limpar imagens órfãs
router.get("/limpar", async (_req: Request, res: Response) => {
  await cleanupUploads();
  res.json({ message: "Limpeza concluída!" });
});

export default router;
