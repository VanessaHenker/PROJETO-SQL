import express from "express";
import multer from "multer";
import path from "path";

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/"); // pasta que você já criou
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // nome único
  },
});

const upload = multer({ storage });

// Router (ou app diretamente)
const router = express.Router();

router.post("/upload", upload.single("imagem"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

  // Retorna o caminho relativo que será salvo no MySQL
  res.json({ imagem_url: `/uploads/${req.file.filename}` });
});

export default router;