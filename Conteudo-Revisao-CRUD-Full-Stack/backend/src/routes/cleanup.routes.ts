import { Router } from "express";
import { limparArquivosOrfaos } from "../utils/cleanupUploads.js";

const router = Router();

router.get("/", async (_req, res) => {
  await limparArquivosOrfaos();
  res.json({ message: "Limpeza executada! Veja o terminal." });
});

export default router;
