import { db } from "../db.js"; 

// GET: Buscar todos os usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// POST: Adicionar novo usuário
export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios (`nome`, `email`, `fone`, `dataNascimento`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.dataNascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Usuário criado com sucesso");
  });
};
