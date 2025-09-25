import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// configuração do multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/"); // pasta uploads já deve existir
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  },
});

const upload = multer({ storage });

// rota de upload
router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  // devolve caminho relativo que vai para o banco
  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

export default router;
