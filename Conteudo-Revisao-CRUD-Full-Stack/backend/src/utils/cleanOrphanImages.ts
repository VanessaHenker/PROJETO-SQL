import fs from "fs/promises";
import path from "path";
import { db } from "../database/conexaoSQL.js";

export const cleanOrphanImages = async (): Promise<string[]> => {
  const uploadsPath = path.join(process.cwd(), "uploads");

  // 1. Lê todos os arquivos da pasta uploads
  const allFiles = await fs.readdir(uploadsPath);

  // 2. Busca todas as imagens cadastradas no banco
  const [rows] = await db.query("SELECT imagem_url FROM produtos");

  const usedImages = (rows as { imagem_url: string | null }[])
    .map((row) => {
      if (!row.imagem_url) return null;

      const parts = String(row.imagem_url).split("/uploads/");
      return parts.length > 1 ? parts[1] : row.imagem_url;
    })
    .filter(Boolean) as string[];

  const deleted: string[] = [];

  // 3. Exclui apenas as imagens que NÃO estão no banco
  for (const file of allFiles) {
    if (!usedImages.includes(file)) {
      await fs.unlink(path.join(uploadsPath, file));
      deleted.push(file);
      console.log(`🗑️ Removida imagem órfã: ${file}`);
    }
  }

  return deleted;
};
