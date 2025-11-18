import { Router } from "express";
import { limparArquivosOrfaos } from "../utils/cleanupUploads.js";

const router = Router();

// Rota manual para rodar limpeza
router.get("/limpar", async (_req, res) => {
  await limparArquivosOrfaos();
  res.json({ status: "Limpeza executada" });
});

export default router;
