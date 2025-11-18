import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Função principal
export async function limparArquivosOrfaos() {
  try {
    console.log("🔍 Verificando arquivos órfãos na pasta uploads...");

    // 1. Ler todos os arquivos físicos da pasta uploads
    const arquivosUploads = fs.readdirSync(UPLOADS_DIR);

    // 2. Conectar ao banco e pegar as imagens do banco
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "seu_banco",
    });

    const [rows]: any = await conn.query(
      "SELECT imagem_url FROM produtos WHERE imagem_url IS NOT NULL"
    );

    // Extrair somente o nome do arquivo ex: /uploads/xxxx.png → xxxx.png
    const imagensNoBanco = rows
      .map((r: any) => path.basename(r.imagem_url))
      .filter((x: string) => x);

    // 3. Identificar arquivos que NÃO estão no banco
    const arquivosOrfaos = arquivosUploads.filter(
      (arq) => !imagensNoBanco.includes(arq)
    );

    // 4. Deletar arquivos órfãos
    arquivosOrfaos.forEach((arquivo) => {
      const filePath = path.join(UPLOADS_DIR, arquivo);
      fs.unlinkSync(filePath);
      console.log(`🗑 Removido: ${arquivo}`);
    });

    await conn.end();

    console.log("✔ Limpeza de arquivos órfãos concluída.");
  } catch (error) {
    console.error("❌ Erro ao limpar arquivos órfãos:", error);
  }
}
