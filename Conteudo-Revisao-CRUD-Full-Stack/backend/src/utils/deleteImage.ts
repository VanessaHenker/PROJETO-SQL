import fs from "fs/promises";
import path from "path";


export const extractFileName = (imagemUrl?: string | null): string | null => {
  if (!imagemUrl) return null;

  try {
    const url = String(imagemUrl).replace(/\\/g, "/"); // normaliza barras (Windows)

    // Se contém /uploads/... extraímos após essa pasta
    const uploadsIndex = url.lastIndexOf("/uploads/");
    if (uploadsIndex !== -1) {
      return url.slice(uploadsIndex + "/uploads/".length) || null;
    }

    // URL completa: retorna o último segmento
    if (url.includes("://")) {
      const parts = url.split("/");
      return parts.pop() || null;
    }

    // Já é um nome de arquivo simples
    return url;
  } catch (err) {
    console.error("Erro ao extrair nome do arquivo:", err);
    return null;
  }
};

export const deleteImage = async (fileName?: string | null): Promise<void> => {
  if (!fileName) return;

  const cleanName = extractFileName(fileName);
  if (!cleanName) return;

  const filePath = path.join(process.cwd(), "uploads", cleanName);

  try {
    await fs.unlink(filePath);
    console.log(`🗑️ Imagem removida: ${cleanName}`);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      console.log(`ℹ️ Imagem já não existe: ${cleanName}`);
    } else {
      console.error("⚠️ Erro ao excluir imagem:", err);
    }
  }
};
