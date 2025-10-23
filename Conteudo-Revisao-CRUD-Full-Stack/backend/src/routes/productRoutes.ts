import express from "express";
import {
  listarProdutos,
  obterProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", listarProdutos);
router.get("/:id", obterProduto);
router.post("/", criarProduto);
router.patch("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

export default router;
