import express from "express";
import cors from "cors";
import path from "path";

import uploadRoutes from "./routes/uploadRoutes.js";    
import productRoutes from "./routes/productRoutes.js"; 

const app = express();

app.use(cors());
app.use(express.json());

// Tornar pasta uploads pública
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rotas
app.use("/upload", uploadRoutes);
app.use("/produtos", productRoutes);

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));
