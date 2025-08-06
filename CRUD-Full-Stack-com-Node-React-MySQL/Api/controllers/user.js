import { db } from "../db.js";

// GET: Buscar todos os usuários
export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).json({ error: "Erro ao buscar usuários" });
    }

    return res.status(200).json(data);
  });
};

// POST: Adicionar novo usuário
export const addUser = (req, res) => {
  const q = "INSERT INTO usuarios (`nome`, `email`, `fone`, `dataNascimento`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.dataNascimento,
  ];

  db.query(q, [values], (err, result) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }

    return res.status(201).json({ message: "Usuário criado com sucesso", id: result.insertId });
  });
};

// PUT: Atualizar usuário
export const updateUser = (req, res) => {
  const q = "UPDATE usuarios SET nome = ?, email = ?, fone = ?, dataNascimento = ? WHERE id = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.dataNascimento,
    req.params.id,
  ];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  });
};

// DELETE: Remover usuário
export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar usuário:", err);
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  });
};
