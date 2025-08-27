const { conexaoSql } = require("../conexaoSql");

const getUsers = (req, res) => {
  const q = "SELECT * FROM produtos";

  conexaoSql.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
};

module.exports = { getUsers };
