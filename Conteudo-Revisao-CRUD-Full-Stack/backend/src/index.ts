import express from "express";
import path from "path";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Servir imagens
app.use("/uploads", express.static(path.resolve("uploads")));

// Rotas
app.use("/produtos", productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
