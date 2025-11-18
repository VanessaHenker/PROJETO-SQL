import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cleanupRoutes from "./routes/cleanupRoutes.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Servir imagens
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rotas principais
app.use("/produtos", productRoutes);
app.use("/upload", uploadRoutes);

// Rota manual para limpar órfãos
app.use("/cleanup", cleanupRoutes);

// Rota padrão
app.get("/", (_req, res) => {
  res.send("API rodando corretamente! 🚀");
});

// Porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
