import { Router } from "express";
import multer from "multer";
import { listarProdutos, obterProduto, criarProduto, atualizarProduto, deletarProduto } from "../controllers/product.js";

const router = Router();

// Configuração Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname),
});
const upload = multer({ storage });

// Rotas
router.get("/", listarProdutos);
router.get("/:id", obterProduto);

// Usar multer para upload de imagem no create e update
router.post("/", upload.single("imagem"), criarProduto);
router.put("/:id", upload.single("imagem"), atualizarProduto);

router.delete("/:id", deletarProduto);

export default router;
