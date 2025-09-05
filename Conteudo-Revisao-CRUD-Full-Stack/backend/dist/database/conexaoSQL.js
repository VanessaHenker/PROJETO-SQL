import mysql from "mysql2/promise";
export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nome_do_banco",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
