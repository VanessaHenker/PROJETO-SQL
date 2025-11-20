import fs from "fs";
import path from "path";
import connection from "../config/database.js";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export const limparUploads = async (req, res) => {
  try {
    // 1. Buscar todas as URLs no banco
    const [rows] = await connection.query(
      "SELECT imagem_url FROM produtos"
    );

    // 2. Extrair apenas o nome dos arquivos
    const imagensBanco = rows
      .map(row => row.imagem_url?.split("/").pop())
      .filter(Boolean);

    // 3. Listar arquivos da pasta uploads
    const arquivosPasta = fs.readdirSync(UPLOADS_DIR);

    let removidos = [];

    // 4. Remover arquivos sem referência no banco
    arquivosPasta.forEach(arquivo => {
      if (!imagensBanco.includes(arquivo)) {
        fs.unlinkSync(path.join(UPLOADS_DIR, arquivo));
        removidos.push(arquivo);
      }
    });

    res.json({
      ok: true,
      mensagem: "Limpeza concluída",
      arquivos_excluidos: removidos,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      erro: "Erro ao limpar uploads",
    });
  }
};
