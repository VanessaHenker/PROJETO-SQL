import {db} from "../conexaoSQL"

export const getUsers = (_, res) => {
  const q = "SELECT * FROM produtos"

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).json(data)
  })
}