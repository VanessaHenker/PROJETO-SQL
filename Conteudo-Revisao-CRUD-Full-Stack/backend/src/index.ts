import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/produtos", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
