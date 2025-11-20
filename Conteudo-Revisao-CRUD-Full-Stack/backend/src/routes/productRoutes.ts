import { Router } from "express";
import {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/product.js";

import { limparUploadsOrfaos } from "../utils/limpezaUploads.js";

const router = Router();

// ROTA DE LIMPEZA – deve vir ANTES do /:id
router.get("/limpar-uploads", async (_req, res) => {
  await limparUploadsOrfaos();
  res.json({ message: "Limpeza executada" });
});

// CRUD
router.get("/", listarProdutos);
router.get("/:id", obterProduto);
router.post("/", criarProduto);
router.put("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

export default router;
