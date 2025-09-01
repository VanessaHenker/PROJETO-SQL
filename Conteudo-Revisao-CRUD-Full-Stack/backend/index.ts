import express, { Application } from "express";
import userRoutes from "./routes/users.ts"
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", userRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800 🚀");
});
