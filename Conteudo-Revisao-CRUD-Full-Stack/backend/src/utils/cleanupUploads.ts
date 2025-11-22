import fs from "fs";
import path from "path";
import { db } from "../database/conexaoSQL.js";
import { RowDataPacket } from "mysql2";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Tipagem correta das linhas retornadas
interface ProdutoRow extends RowDataPacket {
  imagem_url: string | null;
}

export async function cleanupUploads() {
  try {
    // 1. Buscar todas as imagens do banco
    const [rows] = await db.query<ProdutoRow[]>(
      "SELECT imagem_url FROM produtos WHERE imagem_url IS NOT NULL"
    );

    // Agora sim, rows é um array e tem .map()
    const imagensNoBanco = rows.map((r) => {
      if (!r.imagem_url) return null;

      return r.imagem_url.replace("http://localhost:3001", "");
    }).filter(Boolean);

    // 2. Listar todos os arquivos da pasta uploads
    const arquivosUploads = fs.readdirSync(UPLOADS_DIR);

    // 3. Verificar arquivos órfãos
    arquivosUploads.forEach((arquivo) => {
      const caminhoBanco = `/uploads/${arquivo}`;

      if (!imagensNoBanco.includes(caminhoBanco)) {
        console.log(`🧹 Apagando imagem órfã: ${arquivo}`);
        fs.unlinkSync(path.join(UPLOADS_DIR, arquivo));
      }
    });

    console.log("✨ Limpeza de imagens órfãs concluída!");
  } catch (err) {
    console.error("Erro na limpeza de uploads:", err);
  }
}