import fs from "fs/promises";
import path from "path";
import pool from "../config/database.js";

export const cleanOrphanImages = async (): Promise<string[]> => {
  const uploadsPath = path.join(process.cwd(), "uploads");

  // 1. Lê todos os arquivos da pasta uploads
  const allFiles = await fs.readdir(uploadsPath);

  // 2. Busca todas as imagens cadastradas no banco
  const [rows] = await pool.query("SELECT imagem_url FROM produtos");

  const usedImages = rows
    .map((row: any) => {
      if (!row.imagem_url) return null;

      const parts = String(row.imagem_url).split("/uploads/");
      return parts.length > 1 ? parts[1] : row.imagem_url;
    })
    .filter(Boolean);

  const deleted: string[] = [];

  // 3. Exclui apenas as que NÃO estão no banco
  for (const file of allFiles) {
    if (!usedImages.includes(file)) {
      await fs.unlink(path.join(uploadsPath, file));
      deleted.push(file);
      console.log(`🗑️ Removida imagem órfã: ${file}`);
    }
  }

  return deleted;
};
