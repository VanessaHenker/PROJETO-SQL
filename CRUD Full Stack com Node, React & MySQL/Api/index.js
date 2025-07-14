import express from "express";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Servidor backend rodando com sucesso!");
});


app.listen(8800, () => {
  console.log("Servidor backend está rodando em http://localhost:8800");
});
