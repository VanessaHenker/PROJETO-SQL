import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js"; // note o .js

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use("/usuarios", userRoutes);

app.listen(3001, () => {
  console.log("Servidor backend rodando na porta 3001");
});
