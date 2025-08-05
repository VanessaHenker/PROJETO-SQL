import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuarios", userRoutes);

app.listen(3001, () => {
  console.log("Servidor backend rodando na porta 3001");
});
