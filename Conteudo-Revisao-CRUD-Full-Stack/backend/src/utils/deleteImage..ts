import fs from "fs/promises";
import path from "path";


export const extractFileName = (imagemUrl?: string | null): string | null => {
  if (!imagemUrl) return null;

  try {
    const url = String(imagemUrl);
    const uploadsIndex = url.lastIndexOf("/uploads/");
    if (uploadsIndex !== -1) {
      return url.slice(uploadsIndex + "/uploads/".length);
    }


    if (url.includes("://")) {
      const parts = url.split("/");
      return parts[parts.length - 1] || null;
    }

    return url;
  } catch {
    return null;
  }
};

export const deleteImage = async (fileName?: string | null): Promise<void> => {
  if (!fileName) return;

  const filePath = path.join(process.cwd(), "uploads", fileName);

  try {
    await fs.unlink(filePath);
    console.log(`🗑️  Imagem removida: ${fileName}`);
  } catch (err: any) {
    // Se o arquivo não existe, não é erro crítico — apenas log
    if (err.code === "ENOENT") {
      console.log(`ℹ️  Imagem já não existe: ${fileName}`);
    } else {
      console.error("⚠️  Erro ao excluir imagem:", err);
    }
  }
};
