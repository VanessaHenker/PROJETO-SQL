import { Router, Request, Response } from "express";
import upload from "../middleware/upload.js";
import { limparImagensOrfas } from "../utils/cleanupUploads.js";

const router = Router();

router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

// 🚀 Rota para limpar imagens que não estão no banco
router.get("/limpar", async (_req: Request, res: Response) => {
  const removidas = await limparImagensOrfas();

  res.json({
    message: `Limpeza concluída. Total removido: ${removidas.length}`,
    removidas,
  });
});

export default router;
