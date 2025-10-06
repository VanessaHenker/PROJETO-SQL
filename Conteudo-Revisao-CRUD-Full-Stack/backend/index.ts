import express from "express";
import cors from "cors";
import path from "path";

import productRoutes from "./src/routes/productRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Torna a pasta de uploads pública
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));

// 🔹 Rotas principais
app.use("/produtos", productRoutes);
app.use("/upload", uploadRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
