import { Router } from "express";
import path from "path";
import fs from "fs";

const router = Router();

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// GET → limpar arquivos órfãos
router.get("/limpar", (req, res) => {
  try {
    const arquivosNaPasta = fs.readdirSync(UPLOADS_DIR);
    const produtosJsonPath = path.join(process.cwd(), "database", "produtos.json");

    if (!fs.existsSync(produtosJsonPath)) {
      return res.status(500).json({ erro: "Arquivo produtos.json não encontrado" });
    }

    const produtos = JSON.parse(fs.readFileSync(produtosJsonPath, "utf8"));

    const imagensNoBanco = produtos.map((p: any) => p.imagem).filter(Boolean);

    const removidos: string[] = [];

    for (const arquivo of arquivosNaPasta) {
      if (!imagensNoBanco.includes(arquivo)) {
        const caminhoCompleto = path.join(UPLOADS_DIR, arquivo);
        fs.unlinkSync(caminhoCompleto);
        removidos.push(arquivo);
      }
    }

    return res.json({
      mensagem: "Arquivos órfãos removidos com sucesso!",
      removidos,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao limpar arquivos" });
  }
});

export default router;
