import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";

const router = Router();

// Configuração do Multer para salvar os arquivos na pasta uploads
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, "uploads/"); // pasta que você criou
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    // Renomeia o arquivo para evitar conflitos: timestamp + extensão original
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Endpoint para upload de imagem
router.post("/", upload.single("imagem"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  // Retorna a URL relativa que pode ser salva no MySQL
  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

export default router;