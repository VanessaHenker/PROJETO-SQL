import fs from "fs";
import path from "path";
import { db } from "../database/conexaoSQL.js";

// Pasta onde ficam as imagens
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export const limparImagensOrfas = async (): Promise<string[]> => {
  try {
    // 1️⃣ Pegando todas as imagens da pasta
    const arquivosPasta = fs.readdirSync(UPLOADS_DIR);

    // 2️⃣ Pegando todas as imagens do banco
    const [rows] = await db.query("SELECT imagem_url FROM produtos");
    const imagensBanco = rows
      .map((row: any) => row.imagem_url)
      .filter((img: string | null) => img !== null)
      .map((img: string) => img.replace("/uploads/", "")); // deixa só o nome do arquivo

    // 3️⃣ Filtrar as que NÃO estão no banco
    const imagensOrfas = arquivosPasta.filter(
      (arquivo) => !imagensBanco.includes(arquivo)
    );

    // 4️⃣ Excluir arquivos órfãos
    imagensOrfas.forEach((arquivo) => {
      const caminho = path.join(UPLOADS_DIR, arquivo);
      fs.unlinkSync(caminho);
      console.log(`🗑️ Imagem removida: ${arquivo}`);
    });

    return imagensOrfas;
  } catch (err) {
    console.error("Erro ao limpar uploads:", err);
    return [];
  }
};
