import express from "express";
import multer from "multer";
import path from "path";
import {
  listarProdutos,
  criarProduto,
  buscarProduto,     // ✅ nome correto
  atualizarProduto,
  excluirProduto      // ✅ nome correto
} from "../controllers/product.js";

const router = express.Router();

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Rotas
router.get("/", listarProdutos);
router.get("/:id", buscarProduto);
router.post("/", upload.single("imagem"), criarProduto);
router.patch("/:id", upload.single("imagem"), atualizarProduto);
router.delete("/:id", excluirProduto);

export default router;
