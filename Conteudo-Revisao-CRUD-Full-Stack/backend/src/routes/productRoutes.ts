import { Router } from "express";
import { listarProdutos } from "../controllers/product.js";

const router = Router();

router.get("/", listarProdutos);

export default router;
