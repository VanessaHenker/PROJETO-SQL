import fs from "fs";
import path from "path";

export const deleteImage = (fileName) => {
  if (!fileName) return;

  const filePath = path.join(process.cwd(), "uploads", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("⚠️  Erro ao excluir imagem:", err);
    } else {
      console.log("🗑️  Imagem removida:", fileName);
    }
  });
};
