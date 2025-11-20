import fs from "fs";
import path from "path";
import { db } from "../database/conexaoSQL.js";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export const limparUploadsOrfaos = async () => {
  try {
    // Buscar imagens do banco
    const [rows] = await db.query<any[]>("SELECT imagem_url FROM produtos");

    const imagensNoBanco = rows
      .map((r) => r.imagem_url?.replace("/uploads/", "")) // remove prefixo
      .filter(Boolean);

    // Listar arquivos da pasta
    const arquivos = fs.readdirSync(UPLOADS_DIR);

    arquivos.forEach((arquivo) => {
      if (!imagensNoBanco.includes(arquivo)) {
        fs.unlinkSync(path.join(UPLOADS_DIR, arquivo));
        console.log("🗑 Removido arquivo órfão:", arquivo);
      }
    });

    console.log("✔ Limpeza de uploads concluída com sucesso");
  } catch (err) {
    console.error("Erro na limpeza de uploads:", err);
  }
};
