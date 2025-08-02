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
    "INSERT INTO usuarios (`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json("Usuário criado com sucesso");
  });
};

// PUT: Atualizar usuário
export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET nome = ?, email = ?, fone = ?, data_nascimento = ? WHERE id = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
    req.params.id,
  ];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário atualizado com sucesso");
  });
};

// DELETE: Remover usuário
export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Usuário deletado com sucesso");
  });
};
