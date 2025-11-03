import mysql from "mysql2/promise";

const testarConexao = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "MeuBanco2"
    });

    console.log("✅ Conexão bem-sucedida!");
    const [rows] = await connection.query("SHOW TABLES;");
    console.log("Tabelas encontradas:", rows);
    await connection.end();
  } catch (err) {
    console.error("❌ Erro ao conectar:", err);
  }
};

testarConexao();
