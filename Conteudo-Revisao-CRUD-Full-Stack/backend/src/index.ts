import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Servir imagens da pasta uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rotas
app.use("/produtos", productRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));