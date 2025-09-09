import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (_req, res) => {
  res.send("API funcionando!");
});

app.use("/usuarios", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
