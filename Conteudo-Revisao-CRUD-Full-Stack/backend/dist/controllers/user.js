import { db } from "../database/conexaoSQL";
export const getUsers = async (_req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
