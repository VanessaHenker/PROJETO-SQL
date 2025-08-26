import express from "express";
import userRoutes from "./routes/users";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
