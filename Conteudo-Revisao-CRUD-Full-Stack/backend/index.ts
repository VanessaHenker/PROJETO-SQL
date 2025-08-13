import express from "express";  
import userRoutes from "./routes/users"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes)

app.listen(3306, () => {
  console.log("Servidor rodando na porta 3306");
});
