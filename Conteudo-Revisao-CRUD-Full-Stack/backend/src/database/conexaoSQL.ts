import mysql, { Pool } from "mysql2/promise";

export const db: Pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "meubanco2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
});

// Teste de conexão
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ Conectado ao banco de dados!");
    conn.release();
  } catch (err) {
    console.error("❌ Erro de conexão:", err);
  }
})();