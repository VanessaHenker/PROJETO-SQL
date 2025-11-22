import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// GET → limpar arquivos órfãos
router.get("/limpar", (req, res) => {
  try {
    const arquivosDaPasta = fs.readdirSync(UPLOADS_DIR);

    const produtosJson = path.join(process.cwd(), "database", "produtos.json");
    if (!fs.existsSync(produtosJson)) {
      return res.status(500).json({
        erro: "Arquivo produtos.json não encontrado.",
      });
    }

    const produtos = JSON.parse(fs.readFileSync(produtosJson, "utf8"));

    const imagensNoBanco = produtos
      .map((p: any) => p.imagem)
      .filter(Boolean);

    const removidos: string[] = [];

    for (const arquivo of arquivosDaPasta) {
      if (!imagensNoBanco.includes(arquivo)) {
        fs.unlinkSync(path.join(UPLOADS_DIR, arquivo));
        removidos.push(arquivo);
      }
    }

    return res.json({
      mensagem: "Limpeza concluída!",
      removidos,
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ erro: "Erro ao limpar arquivos." });
  }
});

export default router;
