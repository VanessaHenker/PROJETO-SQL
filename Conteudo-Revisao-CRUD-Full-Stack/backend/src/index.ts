import express from "express";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Caminho absoluto da pasta uploads
const uploadsPath = path.join(process.cwd(), "uploads");

// Servir arquivos estáticos da pasta uploads
app.use("/uploads", express.static(uploadsPath));

// Rotas principais
app.use("/produtos", productRoutes);
app.use("/upload", uploadRoutes);

// Rota padrão
app.get("/", (_req, res) => {
  res.send("API rodando corretamente! 🚀");
});

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando corretamente: http://localhost:${PORT}`);
});
