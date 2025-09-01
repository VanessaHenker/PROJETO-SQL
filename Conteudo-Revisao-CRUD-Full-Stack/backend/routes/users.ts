import express from "express";
import userRoutes from "./routes/users"; 
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", userRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800 🚀");
});
